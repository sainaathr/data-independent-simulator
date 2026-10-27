import React, { useState } from 'react'
import {
  Layers,
  RotateCcw,
  FileDown,
  ArrowRight,
  Sparkles,
  GitCompare,
  Clock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSimulation } from '../context/useSimulation'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardContent } from '../components/ui/Card'
import { SimulationControls } from '../components/simulator/SimulationControls'
import { SchemaArchitecture } from '../components/simulator/SchemaArchitecture'
import { SimulationResultPanel } from '../components/simulator/SimulationResultPanel'
import { SimulationExplanation } from '../components/simulator/SimulationExplanation'
import { formatStorageMethod, formatIndexType } from '../lib/simulationEngine'

export const Simulator: React.FC = () => {
  const navigate = useNavigate()
  const {
    simState,
    activeType,
    storageMethod,
    indexType,
    logicalOp,
    selectedColumn,
    newColumnName,
    validationError,
    handleTypeChange,
    handleLogicalOpChange,
    setStorageMethod,
    setIndexType,
    setSelectedColumn,
    setNewColumnName,
    setValidationError,
    handleApplyChange,
    handleReset,
  } = useSimulation()

  const [viewMode, setViewMode] = useState<'current' | 'compare'>('current')
  const result = simState.simulationResult
  const prev = simState.previousSchemas

  return (
    <div className="space-y-8">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="sm">
              ANSI / SPARC Architecture
            </Badge>
            <Badge variant="outline" size="sm">
              Student DBMS Model
            </Badge>
            {result && (
              <Badge variant={result.independenceStatus === 'MAINTAINED' ? 'success' : 'warning'} size="sm" dot>
                {result.independenceStatus}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Layers className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Data Independence Simulator</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Simulate schema modifications across Physical and Logical levels to observe how data independence insulates user views and client applications from internal database changes.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={<FileDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            onClick={() => navigate('/report')}
          >
            Download Report
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={handleReset}
          >
            Reset Simulation
          </Button>
        </div>
      </div>

      {/* ─── CREATIVE FEATURE: SIMULATION TIMELINE & IMPACT OVERVIEW ─── */}
      {result && (
        <Card glass className="border-indigo-300/40 dark:border-indigo-500/30 overflow-hidden shadow-lg animate-in fade-in duration-300">
          <div className="p-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Live Impact Indicator & Pipeline Trace
              </span>
            </div>

            {/* View Mode Toggle: Current vs Before-After Compare */}
            <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('current')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'current'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Current State
              </button>
              <button
                type="button"
                onClick={() => setViewMode('compare')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'compare'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Before vs After</span>
              </button>
            </div>
          </div>

          <CardContent className="p-4 sm:p-5 space-y-4">
            {/* Live Impact Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">External Layer</span>
                <Badge
                  variant={result.externalImpact === 'UNCHANGED' ? 'success' : 'warning'}
                  size="sm"
                  dot={result.externalImpact === 'UNCHANGED'}
                >
                  {result.externalImpact}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Logical Layer</span>
                <Badge
                  variant={result.logicalImpact === 'UNCHANGED' ? 'success' : 'purple'}
                  size="sm"
                  dot={result.logicalImpact === 'UNCHANGED'}
                >
                  {result.logicalImpact}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Physical Layer</span>
                <Badge
                  variant={result.physicalImpact === 'UNCHANGED' ? 'success' : 'info'}
                  size="sm"
                  dot={result.physicalImpact === 'UNCHANGED'}
                >
                  {result.physicalImpact}
                </Badge>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Autonomy Result</span>
                <Badge
                  variant={result.independenceStatus === 'MAINTAINED' ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {result.independenceStatus}
                </Badge>
              </div>
            </div>

            {/* Pipeline Timeline Visualization */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Simulation Execution Timeline</span>
              </span>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border font-semibold text-slate-800 dark:text-slate-200">1. Input Configured</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border font-semibold text-slate-800 dark:text-slate-200">2. Constraint Validation</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border font-semibold text-slate-800 dark:text-slate-200">3. Internal Mutator</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-950 border font-semibold text-slate-800 dark:text-slate-200">4. Mapping Impact Evaluator</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className={`px-2 py-0.5 rounded font-bold ${result.independenceStatus === 'MAINTAINED' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'}`}>
                  5. Result: {result.independenceStatus}
                </span>
              </div>
            </div>

            {/* Before vs After Comparison Card */}
            {viewMode === 'compare' && prev && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                    <tr>
                      <th className="p-3">Architecture Level</th>
                      <th className="p-3">State BEFORE Modification</th>
                      <th className="p-3">State AFTER Modification</th>
                      <th className="p-3">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50/50 dark:bg-slate-900/30">External View</td>
                      <td className="p-3 font-mono">{prev.externalSchema.fields.join(', ')}</td>
                      <td className="p-3 font-mono text-sky-700 dark:text-sky-300 font-semibold">{simState.externalSchema.fields.join(', ')}</td>
                      <td className="p-3">
                        <Badge variant={result.externalImpact === 'UNCHANGED' ? 'success' : 'warning'} size="sm">
                          {result.externalImpact}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Logical Table STUDENT</td>
                      <td className="p-3 font-mono">{prev.logicalSchema.columns.join(', ')}</td>
                      <td className="p-3 font-mono text-indigo-700 dark:text-indigo-300 font-semibold">{simState.logicalSchema.columns.join(', ')}</td>
                      <td className="p-3">
                        <Badge variant={result.logicalImpact === 'UNCHANGED' ? 'success' : 'purple'} size="sm">
                          {result.logicalImpact}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Physical Storage / Index</td>
                      <td className="p-3">
                        {formatStorageMethod(prev.physicalSchema.storageMethod)} / {formatIndexType(prev.physicalSchema.indexType)} ({prev.physicalSchema.pages} pages)
                      </td>
                      <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-300">
                        {formatStorageMethod(simState.physicalSchema.storageMethod)} / {formatIndexType(simState.physicalSchema.indexType)} ({simState.physicalSchema.pages} pages)
                      </td>
                      <td className="p-3">
                        <Badge variant={result.physicalImpact === 'UNCHANGED' ? 'success' : 'info'} size="sm">
                          {result.physicalImpact}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Simulation Controls Panel */}
      <SimulationControls
        simState={simState}
        activeType={activeType}
        onTypeChange={handleTypeChange}
        selectedStorage={storageMethod}
        onStorageChange={(m) => {
          setStorageMethod(m)
          setValidationError(null)
        }}
        selectedIndex={indexType}
        onIndexChange={(i) => {
          setIndexType(i)
          setValidationError(null)
        }}
        selectedLogicalOp={logicalOp}
        onLogicalOpChange={handleLogicalOpChange}
        selectedColumn={selectedColumn}
        onColumnChange={(c) => {
          setSelectedColumn(c)
          setValidationError(null)
        }}
        newColumnName={newColumnName}
        onNewColumnNameChange={(n) => {
          setNewColumnName(n)
          setValidationError(null)
        }}
        validationError={validationError}
        onApplyChange={handleApplyChange}
        onReset={handleReset}
      />

      {/* Three-Schema Architecture Visualization */}
      <SchemaArchitecture simState={simState} />

      {/* Simulation Result & Explanation Panels */}
      {result && (
        <section className="space-y-6 pt-2">
          {/* Result Panel */}
          <SimulationResultPanel result={result} />

          {/* Educational Explanation: "Why did this happen?" */}
          <SimulationExplanation result={result} />
        </section>
      )}
    </div>
  )
}
export default Simulator
