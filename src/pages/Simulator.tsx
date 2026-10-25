import React from 'react'
import { Layers, RotateCcw } from 'lucide-react'
import { useSimulation } from '../context/useSimulation'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { SimulationControls } from '../components/simulator/SimulationControls'
import { SchemaArchitecture } from '../components/simulator/SchemaArchitecture'
import { SimulationResultPanel } from '../components/simulator/SimulationResultPanel'
import { SimulationExplanation } from '../components/simulator/SimulationExplanation'

export const Simulator: React.FC = () => {
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

  const result = simState.simulationResult

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
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Layers className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Data Independence Simulator</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Simulate schema modifications across Physical and Logical levels to observe how data independence insulates user views and client applications from internal database changes.
          </p>
        </div>

        {/* Global Reset Button */}
        <div className="flex items-center gap-3">
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
