import React from 'react'
import { AlertTriangle, ShieldCheck, Activity } from 'lucide-react'
import type { SimulationResult } from '../../types/simulation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'

interface SimulationResultPanelProps {
  result: SimulationResult
}

export const SimulationResultPanel: React.FC<SimulationResultPanelProps> = ({ result }) => {
  const isMaintained = result.independenceStatus === 'MAINTAINED'

  return (
    <Card
      className={`border transition-all duration-300 ${isMaintained
          ? 'border-emerald-500/40 bg-slate-50 dark:bg-slate-900/90 shadow-xl shadow-emerald-950/10'
          : 'border-amber-500/40 bg-slate-50 dark:bg-slate-900/90 shadow-xl shadow-amber-950/10'
        }`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Simulation Result</span>
            </span>
            <CardTitle className="text-lg text-slate-900 dark:text-white pt-0.5">
              {result.title}
            </CardTitle>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={isMaintained ? 'success' : 'warning'}
              size="md"
              dot
            >
              Data Independence: {result.independenceStatus}
            </Badge>

            <Badge
              variant={result.independenceType === 'physical' ? 'info' : result.independenceType === 'logical' ? 'purple' : 'default'}
              size="md"
            >
              Independence Type: {result.independenceType.charAt(0).toUpperCase() + result.independenceType.slice(1)}
            </Badge>
          </div>
        </div>

        <CardDescription className="text-xs text-slate-700 dark:text-slate-300 pt-1 flex items-center gap-1.5">
          {isMaintained ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          )}
          <span>{result.changeSummary}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Per-level Impact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* External Level Impact */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Level 1
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                External Level
              </span>
            </div>
            <Badge
              variant={result.externalImpact === 'UNCHANGED' ? 'success' : 'warning'}
              size="sm"
              dot={result.externalImpact === 'UNCHANGED'}
            >
              {result.externalImpact}
            </Badge>
          </div>

          {/* Logical Level Impact */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Level 2
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Logical Level
              </span>
            </div>
            <Badge
              variant={result.logicalImpact === 'UNCHANGED' ? 'success' : 'purple'}
              size="sm"
              dot={result.logicalImpact === 'UNCHANGED'}
            >
              {result.logicalImpact}
            </Badge>
          </div>

          {/* Physical Level Impact */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Level 3
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Physical Level
              </span>
            </div>
            <Badge
              variant={result.physicalImpact === 'UNCHANGED' ? 'success' : 'info'}
              size="sm"
              dot={result.physicalImpact === 'UNCHANGED'}
            >
              {result.physicalImpact}
            </Badge>
          </div>
        </div>

        {/* Change diff banner if present */}
        {result.diff && (
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Target Schema Diff:</span>
            <span className="font-mono text-indigo-700 dark:text-indigo-300">{result.diff.description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
