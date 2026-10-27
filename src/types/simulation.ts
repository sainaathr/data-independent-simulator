export type SchemaLevel = 'external' | 'logical' | 'physical'

export type IndependenceType = 'physical' | 'logical' | 'none'

export type StorageMethod = 'heap' | 'sequential' | 'btree' | 'hash' | 'clustered' | 'columnar' | 'isa' | 'lsm' | 'partitioned' | 'row'

export type IndexType = 'none' | 'primary' | 'secondary' | 'btree' | 'hash' | 'bitmap' | 'dense' | 'sparse' | 'clustered' | 'composite'

export type LogicalOperation = 'add' | 'remove' | 'rename'

export type LevelImpact = 'UNCHANGED' | 'CHANGED'

export type IndependenceStatus = 'MAINTAINED' | 'AFFECTED'

export interface ExternalSchema {
  name: string
  fields: string[]
  description?: string
}

export interface LogicalSchema {
  name: string
  columns: string[]
  primaryKey?: string
}

export interface PhysicalSchema {
  storageMethod: StorageMethod
  indexType: IndexType
  pages: number
  records: number
}

// Backward-compatibility aliases
export type ExternalView = ExternalSchema
export type LogicalTable = LogicalSchema
export type PhysicalStorage = PhysicalSchema

export interface PhysicalChange {
  type: 'physical'
  storageMethod: StorageMethod
  indexType: IndexType
}

export interface LogicalChange {
  type: 'logical'
  operation: LogicalOperation
  column?: string
  newColumnName?: string
}

export type SimulationChange = PhysicalChange | LogicalChange

export interface SchemaDiff {
  level: SchemaLevel
  description: string
  added?: string[]
  removed?: string[]
  renamed?: { from: string; to: string }[]
  propertyChanges?: { label: string; from: string; to: string }[]
}

export interface SimulationResult {
  externalImpact: LevelImpact
  logicalImpact: LevelImpact
  physicalImpact: LevelImpact
  independenceStatus: IndependenceStatus
  independenceType: IndependenceType
  title: string
  explanation: string
  changeSummary: string
  whyPoints: string[]
  timestamp: number
  diff?: SchemaDiff
  processingSteps?: string[]
  intermediateState?: { step: string; detail: string }[]
}

export interface PreviousSchemas {
  externalSchema: ExternalSchema
  logicalSchema: LogicalSchema
  physicalSchema: PhysicalSchema
}

export interface SimulationState {
  externalSchema: ExternalSchema
  logicalSchema: LogicalSchema
  physicalSchema: PhysicalSchema
  storageMethod: StorageMethod
  indexType: IndexType
  selectedIndependenceType: IndependenceType
  selectedChange: SimulationChange | null
  simulationResult: SimulationResult | null
  previousSchemas?: PreviousSchemas
}

// ─── Phase 3: History & Experiments ───────────────────────────────────────────

/** A single recorded simulation run stored in session history */
export interface HistoryEntry {
  id: string
  runIndex: number
  timestamp: number
  experimentId?: string
  experimentTitle?: string
  change: SimulationChange
  result: SimulationResult
  snapshotBefore: {
    externalSchema: ExternalSchema
    logicalSchema: LogicalSchema
    physicalSchema: PhysicalSchema
  }
  snapshotAfter: {
    externalSchema: ExternalSchema
    logicalSchema: LogicalSchema
    physicalSchema: PhysicalSchema
  }
}

/** Describes a predefined experiment scenario */
export interface ExperimentPreset {
  id: string
  title: string
  type: 'Physical Independence' | 'Logical Independence'
  independenceType: IndependenceType
  badgeVariant: 'info' | 'purple' | 'warning' | 'success'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  scenario: string
  educationalGoal: string
  change: SimulationChange
  /** What the student should observe after running this experiment */
  expectedOutcome: string
}
