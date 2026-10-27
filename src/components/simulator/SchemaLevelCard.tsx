import React from 'react'
import {
  Monitor,
  Table,
  Server,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import type {
  SchemaLevel,
  LevelImpact,
  ExternalSchema,
  LogicalSchema,
  PhysicalSchema,
  SchemaDiff,
} from '../../types/simulation'
import { formatStorageMethod, formatIndexType } from '../../lib/simulationEngine'
import { Badge } from '../ui/Badge'

interface SchemaLevelCardProps {
  level: SchemaLevel
  impact?: LevelImpact
  externalData?: ExternalSchema
  logicalData?: LogicalSchema
  physicalData?: PhysicalSchema
  diff?: SchemaDiff
}

export const SchemaLevelCard: React.FC<SchemaLevelCardProps> = ({
  level,
  impact,
  externalData,
  logicalData,
  physicalData,
  diff,
}) => {
  const isChanged = impact === 'CHANGED'

  // Card header configuration based on level
  const config = {
    external: {
      badge: 'Level 1 • User Views',
      title: `EXTERNAL LEVEL: ${externalData?.name ?? 'Student View'}`,
      description: 'End-user and application perspectives. Project only required fields.',
      icon: <Monitor className="w-4 h-4 text-sky-400" />,
      iconBg: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
      activeBorder: isChanged
        ? 'border-amber-400 dark:border-amber-500/50 bg-amber-50/70 dark:bg-amber-950/20 shadow-lg shadow-amber-950/10 ring-1 ring-amber-400/30 dark:ring-amber-500/30'
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700',
    },
    logical: {
      badge: 'Level 2 • Conceptual Schema',
      title: `LOGICAL LEVEL: Relation \`${logicalData?.name ?? 'STUDENT'}\``,
      description: 'Global community view defining all entities, attributes, and integrity constraints.',
      icon: <Table className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
      iconBg: 'bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
      activeBorder: isChanged
        ? 'border-indigo-400 dark:border-indigo-500/50 bg-indigo-50/70 dark:bg-indigo-950/25 shadow-lg shadow-indigo-950/10 ring-1 ring-indigo-400/30 dark:ring-indigo-500/30'
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700',
    },
    physical: {
      badge: 'Level 3 • Internal Storage Architecture',
      title: 'PHYSICAL LEVEL: File Layout & Access Paths',
      description: 'Data structures, record clustering, indexing mechanisms, and page allocations.',
      icon: <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      activeBorder: isChanged
        ? 'border-emerald-400 dark:border-emerald-500/50 bg-emerald-50/70 dark:bg-emerald-950/20 shadow-lg shadow-emerald-950/10 ring-1 ring-emerald-400/30 dark:ring-emerald-500/30'
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700',
    },
  }[level]

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 ${config.activeBorder}`}>
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${config.iconBg}`}>
            {config.icon}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
              {config.badge}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              {config.title}
            </h3>
          </div>
        </div>

        {impact && (
          <Badge
            variant={
              impact === 'UNCHANGED'
                ? 'success'
                : level === 'logical'
                ? 'purple'
                : level === 'physical'
                ? 'info'
                : 'warning'
            }
            size="sm"
            dot={impact === 'UNCHANGED'}
          >
            {level.toUpperCase()}: {impact}
          </Badge>
        )}
      </div>

      {/* Level Specific Content */}
      <div className="pt-4 space-y-3">
        {level === 'external' && externalData && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Projected View Fields:</span>
              <span className="text-[11px] text-slate-500">
                {externalData.fields.length} attributes exposed
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {externalData.fields.map((field) => (
                <span
                  key={field}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-sky-700 dark:text-sky-300 flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                  <span>{field}</span>
                </span>
              ))}
            </div>

            {externalData.description && (
              <p className="text-[11px] text-slate-500 pt-1">
                {externalData.description}
              </p>
            )}
          </div>
        )}

        {level === 'logical' && logicalData && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Relational Attributes:</span>
              <span className="text-[11px] text-slate-500">
                Table: <code>STUDENT</code> ({logicalData.columns.length} columns)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {logicalData.columns.map((col) => {
                const isPk = col === logicalData.primaryKey
                const isAdded = diff?.added?.includes(col)
                const isRenamed = diff?.renamed?.some((r) => r.to === col)

                let chipStyle = 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-indigo-700 dark:text-indigo-300'
                if (isAdded) {
                  chipStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30'
                } else if (isRenamed) {
                  chipStyle = 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/50 text-indigo-700 dark:text-indigo-200 ring-1 ring-indigo-500/30'
                }

                return (
                  <span
                    key={col}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${chipStyle}`}
                  >
                    {isPk ? (
                      <span className="text-[9px] bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-1 py-0.2 rounded font-bold uppercase tracking-wider">
                        PK
                      </span>
                    ) : isAdded ? (
                      <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                    )}

                    <span>{col}</span>

                    {isAdded && (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1 rounded uppercase font-semibold">
                        Added
                      </span>
                    )}

                    {isRenamed && (
                      <span className="text-[9px] bg-indigo-200 dark:bg-indigo-500/20 text-indigo-300 px-1 rounded uppercase font-semibold">
                        Renamed
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {level === 'physical' && physicalData && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Storage Method */}
              <div
                className={`p-2.5 rounded-xl border transition-all ${
                  diff?.propertyChanges?.some((p) => p.label === 'Storage Method')
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 ring-1 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Storage Layout
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {formatStorageMethod(physicalData.storageMethod)}
                </span>
              </div>

              {/* Index Structure */}
              <div
                className={`p-2.5 rounded-xl border transition-all ${
                  diff?.propertyChanges?.some((p) => p.label === 'Index Structure')
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 ring-1 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Index Structure
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {formatIndexType(physicalData.indexType)}
                </span>
              </div>

              {/* Pages */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Allocated Pages
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {physicalData.pages} Pages
                </span>
              </div>

              {/* Records */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                  Total Records
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {physicalData.records} Rows
                </span>
              </div>
            </div>

            {/* Visual property diff if physical level was modified */}
            {diff?.propertyChanges && diff.propertyChanges.length > 0 && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Physical Transition:
                </span>
                {diff.propertyChanges.map((change) => (
                  <span key={change.label} className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">{change.label}:</span>
                    <span className="line-through text-slate-500">{change.from}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">{change.to}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
