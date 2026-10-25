import React, { useCallback, useState } from 'react'
import { SimulationContext } from './simulationContextInstance'
import type {
  IndependenceType,
  StorageMethod,
  IndexType,
  LogicalOperation,
  SimulationChange,
  SimulationState,
  HistoryEntry,
} from '../types/simulation'
import {
  getInitialSimulationState,
  evaluateSimulation,
  validatePhysicalChange,
  validateLogicalChange,
  ALLOWED_ADD_COLUMNS,
} from '../lib/simulationEngine'

// ─── Context Shape ─────────────────────────────────────────────────────────────

export interface SimulationContextValue {
  // Core simulation state
  simState: SimulationState
  // Controls form state
  activeType: IndependenceType
  storageMethod: StorageMethod
  indexType: IndexType
  logicalOp: LogicalOperation
  selectedColumn: string
  newColumnName: string
  validationError: string | null
  // Session history
  history: HistoryEntry[]
  // Actions
  handleTypeChange: (type: IndependenceType) => void
  handleLogicalOpChange: (op: LogicalOperation) => void
  setStorageMethod: (m: StorageMethod) => void
  setIndexType: (i: IndexType) => void
  setSelectedColumn: (c: string) => void
  setNewColumnName: (n: string) => void
  setValidationError: (e: string | null) => void
  handleApplyChange: () => boolean
  handleReset: () => void
  runExperiment: (change: SimulationChange, experimentId?: string, experimentTitle?: string) => boolean
  clearHistory: () => void
}


// ─── Provider ─────────────────────────────────────────────────────────────────

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simState, setSimState] = useState<SimulationState>(getInitialSimulationState)

  // Controls form state
  const [activeType, setActiveType] = useState<IndependenceType>('physical')
  const [storageMethod, setStorageMethod] = useState<StorageMethod>('btree')
  const [indexType, setIndexType] = useState<IndexType>('btree')
  const [logicalOp, setLogicalOp] = useState<LogicalOperation>('add')
  const [selectedColumn, setSelectedColumn] = useState<string>('email')
  const [newColumnName, setNewColumnName] = useState<string>('program')
  const [validationError, setValidationError] = useState<string | null>(null)

  // Session history
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [runCounter, setRunCounter] = useState(0)

  const appendHistory = useCallback(
    (
      change: SimulationChange,
      prevState: SimulationState,
      nextState: SimulationState,
      experimentId?: string,
      experimentTitle?: string
    ) => {
      if (!nextState.simulationResult) return
      const entry: HistoryEntry = {
        id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        runIndex: runCounter + 1,
        timestamp: nextState.simulationResult.timestamp,
        experimentId,
        experimentTitle,
        change,
        result: nextState.simulationResult,
        snapshotBefore: {
          externalSchema: { ...prevState.externalSchema, fields: [...prevState.externalSchema.fields] },
          logicalSchema: { ...prevState.logicalSchema, columns: [...prevState.logicalSchema.columns] },
          physicalSchema: { ...prevState.physicalSchema },
        },
        snapshotAfter: {
          externalSchema: { ...nextState.externalSchema, fields: [...nextState.externalSchema.fields] },
          logicalSchema: { ...nextState.logicalSchema, columns: [...nextState.logicalSchema.columns] },
          physicalSchema: { ...nextState.physicalSchema },
        },
      }
      setHistory((prev) => [entry, ...prev])
      setRunCounter((c) => c + 1)
    },
    [runCounter]
  )

  const handleTypeChange = useCallback(
    (type: IndependenceType) => {
      setActiveType(type)
      setValidationError(null)
      if (type === 'logical') {
        if (logicalOp === 'add') {
          const firstAvailable = ALLOWED_ADD_COLUMNS.find(
            (c) => !simState.logicalSchema.columns.includes(c)
          )
          setSelectedColumn(firstAvailable || ALLOWED_ADD_COLUMNS[0])
        } else {
          setSelectedColumn(simState.logicalSchema.columns[0] || 'student_id')
        }
      }
    },
    [logicalOp, simState.logicalSchema.columns]
  )

  const handleLogicalOpChange = useCallback(
    (op: LogicalOperation) => {
      setLogicalOp(op)
      setValidationError(null)
      if (op === 'add') {
        const firstAvailable = ALLOWED_ADD_COLUMNS.find(
          (c) => !simState.logicalSchema.columns.includes(c)
        )
        setSelectedColumn(firstAvailable || ALLOWED_ADD_COLUMNS[0])
      } else if (op === 'remove') {
        setSelectedColumn(simState.logicalSchema.columns[0] || 'student_id')
      } else if (op === 'rename') {
        const colToRename = simState.logicalSchema.columns.includes('course')
          ? 'course'
          : simState.logicalSchema.columns[0] || 'student_id'
        setSelectedColumn(colToRename)
        setNewColumnName('program')
      }
    },
    [simState.logicalSchema.columns]
  )

  /** Applies the currently configured manual change from the controls form. Returns true on success. */
  const handleApplyChange = useCallback((): boolean => {
    if (activeType === 'physical') {
      const error = validatePhysicalChange(simState, storageMethod, indexType)
      if (error) {
        setValidationError(error)
        return false
      }
      setValidationError(null)
      const change: SimulationChange = { type: 'physical', storageMethod, indexType }
      const updatedState = evaluateSimulation(simState, change)
      appendHistory(change, simState, updatedState)
      setSimState(updatedState)
      return true
    } else {
      const error = validateLogicalChange(simState, logicalOp, selectedColumn, newColumnName)
      if (error) {
        setValidationError(error)
        return false
      }
      setValidationError(null)
      const change: SimulationChange = {
        type: 'logical',
        operation: logicalOp,
        column: selectedColumn,
        newColumnName: logicalOp === 'rename' ? newColumnName : undefined,
      }
      const updatedState = evaluateSimulation(simState, change)
      appendHistory(change, simState, updatedState)
      setSimState(updatedState)

      if (logicalOp === 'add') {
        const remaining = ALLOWED_ADD_COLUMNS.find(
          (c) => !updatedState.logicalSchema.columns.includes(c)
        )
        if (remaining) setSelectedColumn(remaining)
      }
      return true
    }
  }, [activeType, simState, storageMethod, indexType, logicalOp, selectedColumn, newColumnName, appendHistory])

  /** Runs a predefined experiment change (bypasses form state). Returns true on success. */
  const runExperiment = useCallback(
    (change: SimulationChange, experimentId?: string, experimentTitle?: string): boolean => {
      // Reset simulation state to initial before running the experiment
      const freshState = getInitialSimulationState()
      let validationError: string | null = null

      if (change.type === 'physical') {
        validationError = validatePhysicalChange(freshState, change.storageMethod, change.indexType)
      } else if (change.type === 'logical') {
        validationError = validateLogicalChange(freshState, change.operation, change.column, change.newColumnName)
      }

      if (validationError) {
        // For experiment presets this shouldn't happen — but run from current state as fallback
        const updatedState = evaluateSimulation(simState, change)
        appendHistory(change, simState, updatedState, experimentId, experimentTitle)
        setSimState(updatedState)
        return true
      }

      const updatedState = evaluateSimulation(freshState, change)
      appendHistory(change, freshState, updatedState, experimentId, experimentTitle)
      setSimState(updatedState)

      // Sync form controls with the applied change
      if (change.type === 'physical') {
        setActiveType('physical')
        setStorageMethod(change.storageMethod)
        setIndexType(change.indexType)
      } else {
        setActiveType('logical')
        setLogicalOp(change.operation)
        if (change.column) setSelectedColumn(change.column)
        if (change.newColumnName) setNewColumnName(change.newColumnName)
      }
      setValidationError(null)
      return true
    },
    [simState, appendHistory]
  )

  const handleReset = useCallback(() => {
    setSimState(getInitialSimulationState())
    setActiveType('physical')
    setStorageMethod('btree')
    setIndexType('btree')
    setLogicalOp('add')
    setSelectedColumn('email')
    setNewColumnName('program')
    setValidationError(null)
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    setRunCounter(0)
  }, [])

  const value: SimulationContextValue = {
    simState,
    activeType,
    storageMethod,
    indexType,
    logicalOp,
    selectedColumn,
    newColumnName,
    validationError,
    history,
    handleTypeChange,
    handleLogicalOpChange,
    setStorageMethod,
    setIndexType,
    setSelectedColumn,
    setNewColumnName,
    setValidationError,
    handleApplyChange,
    handleReset,
    runExperiment,
    clearHistory,
  }

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>
}

