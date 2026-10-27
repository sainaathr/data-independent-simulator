import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  History as HistoryIcon,
  Archive,
  Download,
  Trash2,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  Network,
  Clock,
  FlaskConical,
  ChevronDown,
  ChevronRight,
  Play,
  FileDown,
  FileText,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useSimulation } from '../context/useSimulation'
import type { HistoryEntry } from '../types/simulation'
import { formatStorageMethod, formatIndexType } from '../lib/simulationEngine'
import { BrainCircuit } from 'lucide-react'
import {
  buildReportData,
  downloadPdfReport,
  downloadDocxReport,
  downloadTxtReport,
} from '../lib/reportGenerator'

// ─── Practice History Types ────────────────────────────────────────────────────
interface PracticeAttempt {
  id: string
  date: number
  type: 'quiz' | 'competitive'
  difficulty?: string
  examFilter?: string
  diffFilter?: string
  count: number
  score: number
  percentage: number
  correct: number
  incorrect: number
  topics: string[]
}


// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function describeChange(entry: HistoryEntry): string {
  const c = entry.change
  if (c.type === 'physical') {
    return `Storage → ${formatStorageMethod(c.storageMethod)}, Index → ${formatIndexType(c.indexType)}`
  }
  if (c.operation === 'add') return `Add column "${c.column}"`
  if (c.operation === 'remove') return `Remove column "${c.column}"`
  if (c.operation === 'rename') return `Rename "${c.column}" → "${c.newColumnName}"`
  return 'Schema change'
}

function exportJSON(entries: HistoryEntry[]) {
  const data = JSON.stringify(entries, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `simulation-history-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function exportCSV(entries: HistoryEntry[]) {
  const headers = [
    'Run #', 'Time', 'Type', 'Change Summary', 'External Impact',
    'Logical Impact', 'Physical Impact', 'Independence Status', 'Experiment',
  ]
  const rows = entries.map((e) => [
    e.runIndex,
    formatTimestamp(e.timestamp),
    e.change.type,
    describeChange(e),
    e.result.externalImpact,
    e.result.logicalImpact,
    e.result.physicalImpact,
    e.result.independenceStatus,
    e.experimentTitle ?? '—',
  ])
  const csv = [headers, ...rows].map((r) => r.map(String).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `simulation-history-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── History Entry Row ─────────────────────────────────────────────────────────

const HistoryRow: React.FC<{ entry: HistoryEntry; index?: number }> = ({ entry }) => {
  const [open, setOpen] = useState(false)
  const isMaintained = entry.result.independenceStatus === 'MAINTAINED'
  const isPhysical = entry.change.type === 'physical'

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 overflow-hidden">
      {/* Summary row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-200 dark:hover:bg-slate-100/40 dark:bg-slate-800/40 transition-colors group"
      >
        {/* Run number */}
        <span className="text-xs font-mono font-bold text-slate-500 w-8 shrink-0 text-center">
          #{entry.runIndex}
        </span>

        {/* Type icon */}
        <div
          className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
            isPhysical
              ? 'bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400'
              : 'bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
          }`}
        >
          {isPhysical ? <HardDrive className="w-3.5 h-3.5" /> : <Network className="w-3.5 h-3.5" />}
        </div>

        {/* Change summary */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{describeChange(entry)}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-slate-600" />
            <span className="text-[11px] text-slate-500">{formatTimestamp(entry.timestamp)}</span>
            {entry.experimentTitle && (
              <>
                <span className="text-slate-700">•</span>
                <FlaskConical className="w-3 h-3 text-amber-500" />
                <span className="text-[11px] text-amber-500/80 truncate">{entry.experimentTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Impact badges */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {(['externalImpact', 'logicalImpact', 'physicalImpact'] as const).map((key) => {
            const impact = entry.result[key]
            const label = { externalImpact: 'EXT', logicalImpact: 'LOG', physicalImpact: 'PHY' }[key]
            return (
              <span
                key={key}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  impact === 'CHANGED'
                    ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                }`}
              >
                {label}:{impact === 'CHANGED' ? '↑' : '—'}
              </span>
            )
          })}
        </div>

        {/* Independence status */}
        <div className="shrink-0">
          {isMaintained ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Maintained</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Affected</span>
            </span>
          )}
        </div>

        {/* Expand chevron */}
        <div className="text-slate-500 group-hover:text-slate-700 dark:text-slate-300 transition-colors shrink-0">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 bg-white/40 dark:bg-slate-950/40">
          {/* Explanation */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Result Title
            </p>
            <p className="text-sm text-slate-900 dark:text-white font-medium">{entry.result.title}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Explanation
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{entry.result.explanation}</p>
          </div>

          {/* Why Points */}
          {entry.result.whyPoints.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Why this happened
              </p>
              <ul className="space-y-1.5">
                {entry.result.whyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Schema before / after */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Before', snapshot: entry.snapshotBefore },
              { label: 'After', snapshot: entry.snapshotAfter },
            ].map(({ label, snapshot }) => (
              <div
                key={label}
                className="rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 space-y-2"
              >
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{label}</p>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="text-slate-500">External: </span>
                    <span className="text-slate-800 dark:text-slate-200">{snapshot.externalSchema.fields.join(', ')}</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="text-slate-500">Logical: </span>
                    <span className="text-slate-800 dark:text-slate-200">{snapshot.logicalSchema.columns.join(', ')}</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="text-slate-500">Physical: </span>
                    <span className="text-slate-800 dark:text-slate-200">
                      {formatStorageMethod(snapshot.physicalSchema.storageMethod)} / {formatIndexType(snapshot.physicalSchema.indexType)} / {snapshot.physicalSchema.pages}p
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Run report export & index label */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="w-3.5 h-3.5 text-indigo-500" />}
                onClick={() => {
                  const rep = buildReportData({ simState: entry.snapshotAfter as any, historyEntry: entry })
                  if (rep) downloadPdfReport(rep)
                }}
              >
                PDF Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<FileText className="w-3.5 h-3.5 text-blue-500" />}
                onClick={async () => {
                  const rep = buildReportData({ simState: entry.snapshotAfter as any, historyEntry: entry })
                  if (rep) await downloadDocxReport(rep)
                }}
              >
                Word (DOCX)
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<FileText className="w-3.5 h-3.5 text-slate-500" />}
                onClick={() => {
                  const rep = buildReportData({ simState: entry.snapshotAfter as any, historyEntry: entry })
                  if (rep) downloadTxtReport(rep)
                }}
              >
                TXT Report
              </Button>
            </div>
            <p className="text-[11px] text-slate-500">Run #{entry.runIndex} &bull; ID: {entry.id}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main History Page ─────────────────────────────────────────────────────────

type FilterType = 'all' | 'physical' | 'logical'
type SortOrder = 'newest' | 'oldest'
type FilterStatus = 'all' | 'maintained' | 'affected'

const SimulationHistoryView: React.FC = () => {
  const navigate = useNavigate()
  const { history, clearHistory } = useSimulation()
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  const filtered = useMemo(() => {
    let result = [...history]
    if (filterType !== 'all') {
      result = result.filter((e) => e.change.type === filterType)
    }
    if (filterStatus !== 'all') {
      result = result.filter((e) =>
        filterStatus === 'maintained'
          ? e.result.independenceStatus === 'MAINTAINED'
          : e.result.independenceStatus === 'AFFECTED'
      )
    }
    if (sortOrder === 'oldest') result.reverse()
    return result
  }, [history, filterType, filterStatus, sortOrder])

  // Aggregate stats
  const totalRuns = history.length
  const maintained = history.filter((e) => e.result.independenceStatus === 'MAINTAINED').length
  const affected = history.filter((e) => e.result.independenceStatus === 'AFFECTED').length
  const physicalRuns = history.filter((e) => e.change.type === 'physical').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">
              Simulation Log
            </Badge>
            <Badge variant="outline" size="sm">
              Session History
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <HistoryIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Simulation History & Audit</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Review all schema modifications from this session, with before/after snapshots, independence verdicts, and educational explanations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            variant="primary"
            size="sm"
            icon={<FileDown className="w-4 h-4 fill-white" />}
            onClick={() => navigate('/report')}
          >
            Download Report
          </Button>

          {totalRuns > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={() => exportJSON(history)}
              >
                JSON
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={() => exportCSV(history)}
              >
                CSV
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                onClick={clearHistory}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-300"
              >
                Clear
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats row */}
      {totalRuns > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Runs', value: totalRuns, color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Independence Maintained', value: maintained, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Independence Affected', value: affected, color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Physical Changes', value: physicalRuns, color: 'text-blue-600 dark:text-blue-400' },
          ].map((s) => (
            <Card key={s.label} glass className="px-5 py-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">{s.label}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Controls: Filter + Sort */}
      {totalRuns > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {/* Type filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
            {(['all', 'physical', 'logical'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  filterType === f
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
            {(['all', 'maintained', 'affected'] as FilterStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  filterStatus === s
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowUpDown className="w-3.5 h-3.5" />}
            onClick={() => setSortOrder((o) => (o === 'newest' ? 'oldest' : 'newest'))}
          >
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>

          <span className="text-xs text-slate-500 ml-auto">
            {filtered.length} of {totalRuns} records
          </span>
        </div>
      )}

      {/* Empty state */}
      {totalRuns === 0 && (
        <Card glass className="py-16 text-center">
          <CardContent className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-400">
              <Archive className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">No Simulation Records Yet</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Run simulations in the Simulator or execute experiments in the Lab to build your session history here.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                icon={<Play className="w-3.5 h-3.5 fill-white" />}
                onClick={() => navigate('/simulator')}
              >
                Open Simulator
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<FlaskConical className="w-3.5 h-3.5" />}
                onClick={() => navigate('/experiments')}
              >
                Try Experiments
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtered empty state */}
      {totalRuns > 0 && filtered.length === 0 && (
        <Card glass className="py-10 text-center">
          <CardContent className="flex flex-col items-center justify-center space-y-3">
            <Filter className="w-8 h-8 text-slate-600" />
            <p className="text-sm text-slate-600 dark:text-slate-400">No records match the current filter.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setFilterType('all'); setFilterStatus('all') }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* History list */}
      {filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map((entry, i) => (
            <HistoryRow key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      )}

      {/* Feature summary cards (always visible) */}
      {totalRuns === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card glass>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">Audit Trails</CardTitle>
              <CardDescription className="text-xs">
                Every DDL change and storage configuration is recorded with timestamps, before/after snapshots, and independence verdicts.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card glass>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">Change Replay</CardTitle>
              <CardDescription className="text-xs">
                Expand any record to compare before-and-after schema mappings and read the educational explanation.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card glass>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">Export Reports</CardTitle>
              <CardDescription className="text-xs">
                Download your session log as JSON or CSV for academic reporting, presentations, or further analysis.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  )
}

// ─── Practice History View ─────────────────────────────────────────────────────

const PracticeHistoryView: React.FC = () => {
  const [history, setHistory] = useState<PracticeAttempt[]>([])

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem('practiceHistory') || '[]')
    setHistory(data.reverse())
  }, [])

  if (history.length === 0) {
    return (
      <Card glass className="py-16 text-center">
        <CardContent className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-400">
            <Archive className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">No Practice Records Yet</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Complete quizzes or competitive exam practice to build your history here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card glass className="px-5 py-4">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{history.length}</p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Total Attempts</p>
        </Card>
        <Card glass className="px-5 py-4">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / history.length)}%
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Average Score</p>
        </Card>
        <Card glass className="px-5 py-4">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {history.reduce((acc, h) => acc + h.correct, 0)}
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">Total Correct Answers</p>
        </Card>
      </div>

      <div className="space-y-3">
        {history.map(attempt => (
          <div key={attempt.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  attempt.type === 'quiz' ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20' : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                }`}>
                  {attempt.type === 'quiz' ? 'Quiz' : 'Competitive'}
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {attempt.type === 'quiz' 
                    ? `${attempt.difficulty?.toUpperCase()} Difficulty` 
                    : `${attempt.examFilter} (${attempt.diffFilter})`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{new Date(attempt.date).toLocaleString()}</span>
                <span>•</span>
                <span>{attempt.count} Questions</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 md:justify-end">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{attempt.score}/{attempt.count}</div>
                <div className="text-[10px] uppercase text-slate-500">Score</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${attempt.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' : attempt.percentage >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {attempt.percentage}%
                </div>
                <div className="text-[10px] uppercase text-slate-500">Accuracy</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Wrapper ──────────────────────────────────────────────────────────────

export const History: React.FC = () => {
  const [tab, setTab] = useState<'simulation' | 'practice'>('simulation')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 w-fit">
        <button
          onClick={() => setTab('simulation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            tab === 'simulation'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <HistoryIcon className="w-4 h-4" />
          Simulation History
        </button>
        <button
          onClick={() => setTab('practice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            tab === 'practice'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          Practice History
        </button>
      </div>

      {tab === 'simulation' ? <SimulationHistoryView /> : <PracticeHistoryView />}
    </div>
  )
}
