import React from 'react'
import { ArrowDown, Layers } from 'lucide-react'
import type { SimulationState } from '../../types/simulation'
import { SchemaLevelCard } from './SchemaLevelCard'
import { Badge } from '../ui/Badge'

interface SchemaArchitectureProps {
  simState: SimulationState
}

export const SchemaArchitecture: React.FC<SchemaArchitectureProps> = ({ simState }) => {
  const result = simState.simulationResult
  const diff = result?.diff

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Three-Schema Database Architecture</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Real-time state across External, Logical/Conceptual, and Internal/Physical layers
          </p>
        </div>

        {result && (
          <Badge
            variant={result.independenceStatus === 'MAINTAINED' ? 'success' : 'warning'}
            size="sm"
            dot
          >
            {result.independenceType.toUpperCase()} INDEPENDENCE {result.independenceStatus}
          </Badge>
        )}
      </div>

      {/* 3-Level Architecture with Connectors */}
      <div className="space-y-4">
        {/* LEVEL 1: EXTERNAL LEVEL */}
        <SchemaLevelCard
          level="external"
          impact={result?.externalImpact}
          externalData={simState.externalSchema}
          diff={diff?.level === 'external' ? diff : undefined}
        />

        {/* CONNECTOR 1: External <-> Logical */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              External / Conceptual Mapping
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium hidden sm:inline">
              (Logical Data Independence Barrier)
            </span>
          </div>
        </div>

        {/* LEVEL 2: LOGICAL / CONCEPTUAL LEVEL */}
        <SchemaLevelCard
          level="logical"
          impact={result?.logicalImpact}
          logicalData={simState.logicalSchema}
          diff={diff?.level === 'logical' ? diff : undefined}
        />

        {/* CONNECTOR 2: Logical <-> Physical */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Conceptual / Internal Mapping
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium hidden sm:inline">
              (Physical Data Independence Barrier)
            </span>
          </div>
        </div>

        {/* LEVEL 3: PHYSICAL / INTERNAL LEVEL */}
        <SchemaLevelCard
          level="physical"
          impact={result?.physicalImpact}
          physicalData={simState.physicalSchema}
          diff={diff?.level === 'physical' ? diff : undefined}
        />
      </div>
    </section>
  )
}
