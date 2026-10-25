import React from 'react'
import { HelpCircle, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react'
import type { SimulationResult } from '../../types/simulation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'

interface SimulationExplanationProps {
  result: SimulationResult
}

export const SimulationExplanation: React.FC<SimulationExplanationProps> = ({ result }) => {
  const isMaintained = result.independenceStatus === 'MAINTAINED'

  return (
    <Card glass className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="w-5 h-5" />
          <CardTitle className="text-base text-slate-900 dark:text-white">Why did this happen?</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Theoretical ANSI/SPARC schema evaluation and mapping analysis
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Core Educational Explanation Paragraph */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed shadow-sm">
          <div className="flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" />
            <p>{result.explanation}</p>
          </div>
        </div>

        {/* Detailed Trace Points */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
            Architectural Trace:
          </span>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {result.whyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 p-2 rounded-lg bg-white/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60"
              >
                {isMaintained ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
