import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FlaskConical,
  HardDrive,
  Network,
  Play,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Zap,
  BarChart3,
  Info,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useSimulation } from '../context/useSimulation'
import { EXPERIMENT_PRESETS } from '../lib/experiments'
import type { ExperimentPreset } from '../types/simulation'

// ─── Difficulty colour helpers ─────────────────────────────────────────────────

function difficultyStyle(d: ExperimentPreset['difficulty']) {
  switch (d) {
    case 'Beginner':
      return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25'
    case 'Intermediate':
      return 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/25'
    case 'Advanced':
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25'
  }
}

// ─── Single Experiment Card ────────────────────────────────────────────────────

interface ExperimentCardProps {
  exp: ExperimentPreset
  ranIds: Set<string>
  onRun: (exp: ExperimentPreset) => void
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({ exp, ranIds, onRun }) => {
  const [expanded, setExpanded] = useState(false)
  const hasRun = ranIds.has(exp.id)
  const isPhysical = exp.independenceType === 'physical'

  return (
    <Card glass hover className="flex flex-col justify-between group">
      <CardHeader>
        {/* Top row: id + type badge */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-500">{exp.id}</span>
          <Badge variant={exp.badgeVariant} size="sm">
            {exp.type}
          </Badge>
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mt-3">
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
              isPhysical
                ? 'bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400'
                : 'bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
            }`}
          >
            {isPhysical ? <HardDrive className="w-4 h-4" /> : <Network className="w-4 h-4" />}
          </div>
          <CardTitle className="text-base leading-snug group-hover:text-indigo-300 transition-colors">
            {exp.title}
          </CardTitle>
        </div>

        {/* Scenario description */}
        <CardDescription className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {exp.scenario}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Difficulty + Status row */}
        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 dark:border-slate-800/80">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-medium ${difficultyStyle(exp.difficulty)}`}
          >
            {exp.difficulty}
          </span>
          {hasRun ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          ) : (
            <span className="text-slate-500">Not yet run</span>
          )}
        </div>

        {/* Educational goal accordion */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 transition-colors py-1"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            Educational goal
          </span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </button>

        {expanded && (
          <div className="rounded-xl bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-3 space-y-2">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{exp.educationalGoal}</p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Expected outcome
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{exp.expectedOutcome}</p>
            </div>
          </div>
        )}

        {/* Run button */}
        <Button
          variant={hasRun ? 'secondary' : 'primary'}
          size="sm"
          icon={<Play className="w-3.5 h-3.5 fill-current" />}
          className="w-full justify-center"
          onClick={() => onRun(exp)}
        >
          {hasRun ? 'Run Again' : 'Run Experiment'}
        </Button>
      </CardContent>
    </Card>
  )
}

// ─── Main Experiments Page ─────────────────────────────────────────────────────

export const Experiments: React.FC = () => {
  const navigate = useNavigate()
  const { runExperiment, history } = useSimulation()
  const [lastRunId, setLastRunId] = useState<string | null>(null)
  const [lastRunTitle, setLastRunTitle] = useState<string | null>(null)

  // Track which experiment IDs have been run this session
  const ranIds = new Set(history.map((h) => h.experimentId).filter(Boolean) as string[])

  const handleRun = (exp: ExperimentPreset) => {
    const success = runExperiment(exp.change, exp.id, exp.title)
    if (success) {
      setLastRunId(exp.id)
      setLastRunTitle(exp.title)
    }
  }

  const physicalExps = EXPERIMENT_PRESETS.filter((e) => e.independenceType === 'physical')
  const logicalExps = EXPERIMENT_PRESETS.filter((e) => e.independenceType === 'logical')

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="warning" size="sm">
              Experiment Mode
            </Badge>
            <Badge variant="outline" size="sm">
              {EXPERIMENT_PRESETS.length} Preset Scenarios
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <FlaskConical className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            <span>Database Experiments Lab</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Execute controlled schema mutation scenarios and systematically measure whether data independence holds. Each experiment auto-configures the simulator and logs results to History.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            icon={<BookOpen className="w-4 h-4" />}
            onClick={() => navigate('/concepts')}
          >
            Learn Concepts
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<BarChart3 className="w-4 h-4" />}
            onClick={() => navigate('/history')}
          >
            View History
          </Button>
        </div>
      </div>

      {/* Success flash banner */}
      {lastRunId && lastRunTitle && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div className="flex-1 min-w-0">
            <span className="font-semibold">{lastRunTitle}</span>
            <span className="text-emerald-700 dark:text-emerald-400/80"> ran successfully. </span>
            <button
              className="underline underline-offset-2 hover:text-emerald-950 dark:hover:text-white transition-colors cursor-pointer"
              onClick={() => navigate('/simulator')}
            >
              View in Simulator →
            </button>
          </div>
          <button
            onClick={() => { setLastRunId(null); setLastRunTitle(null) }}
            className="text-emerald-700 dark:text-emerald-400/60 hover:text-emerald-950 dark:hover:text-emerald-300 transition-colors text-xs ml-auto shrink-0 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Experiments', value: EXPERIMENT_PRESETS.length, icon: FlaskConical, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Completed', value: ranIds.size, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Physical', value: physicalExps.length, icon: HardDrive, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Logical', value: logicalExps.length, icon: Network, color: 'text-indigo-600 dark:text-indigo-400' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} glass className="px-5 py-4 flex items-center gap-3">
              <div className={`${stat.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">{stat.label}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Physical Independence Experiments */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Physical Independence Scenarios
          </h2>
          <Badge variant="info" size="sm">{physicalExps.length} experiments</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {physicalExps.map((exp) => (
            <ExperimentCard key={exp.id} exp={exp} ranIds={ranIds} onRun={handleRun} />
          ))}
        </div>
      </section>

      {/* Logical Independence Experiments */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Logical Independence Scenarios
          </h2>
          <Badge variant="purple" size="sm">{logicalExps.length} experiments</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {logicalExps.map((exp) => (
            <ExperimentCard key={exp.id} exp={exp} ranIds={ranIds} onRun={handleRun} />
          ))}
        </div>
      </section>

      {/* Validation Checklist */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-base">Experiment Validation Checklist</CardTitle>
          </div>
          <CardDescription>
            Criteria verified automatically during each experiment to confirm data independence
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0">
          {[
            'External view field set unchanged after physical modifications',
            'Logical schema columns preserved across storage reorganization',
            'Query syntax validity across external application interfaces',
            'Result set semantic equivalence before & after modification',
            'Integrity constraints and primary key preservation',
            'Storage cost & index lookup efficiency profiling',
          ].map((criterion) => (
            <div
              key={criterion}
              className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{criterion}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
