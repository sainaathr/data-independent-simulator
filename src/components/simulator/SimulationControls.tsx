import React, { useState } from 'react'
import {
  HardDrive,
  Network,
  Zap,
  RotateCcw,
  AlertCircle,
  PlusCircle,
  Trash2,
  Edit3,
  Code2,
  Database,
  Search,
} from 'lucide-react'
import type {
  IndependenceType,
  StorageMethod,
  IndexType,
  LogicalOperation,
  SimulationState,
} from '../../types/simulation'
import {
  ALLOWED_ADD_COLUMNS,
  formatStorageMethod,
  formatIndexType,
} from '../../lib/simulationEngine'
import {
  STORAGE_METHODS_CATALOG,
  INDEX_STRUCTURES_CATALOG,
  REALISTIC_STUDENT_COLUMNS,
  DBMS_OPERATIONS_CATALOG,
} from '../../data/simulatorKnowledge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface SimulationControlsProps {
  simState: SimulationState
  activeType: IndependenceType
  onTypeChange: (type: IndependenceType) => void
  selectedStorage: StorageMethod
  onStorageChange: (method: StorageMethod) => void
  selectedIndex: IndexType
  onIndexChange: (index: IndexType) => void
  selectedLogicalOp: LogicalOperation
  onLogicalOpChange: (op: LogicalOperation) => void
  selectedColumn: string
  onColumnChange: (col: string) => void
  newColumnName: string
  onNewColumnNameChange: (name: string) => void
  validationError: string | null
  onApplyChange: () => void
  onReset: () => void
}

const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--input-bg)',
  color: 'var(--fg)',
  borderColor: 'var(--border)',
  borderWidth: '1px',
  borderStyle: 'solid',
  outline: 'none',
  width: '100%',
  padding: '0.6rem 0.85rem',
  borderRadius: '0.75rem',
  fontSize: '0.85rem',
  cursor: 'pointer',
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  simState,
  activeType,
  onTypeChange,
  selectedStorage,
  onStorageChange,
  selectedIndex,
  onIndexChange,
  selectedLogicalOp,
  onLogicalOpChange,
  selectedColumn,
  onColumnChange,
  newColumnName,
  onNewColumnNameChange,
  validationError,
  onApplyChange,
  onReset,
}) => {
  const [showMethodDetails, setShowMethodDetails] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<'simulation' | 'operations'>('simulation')
  const [selectedDbmsOp, setSelectedDbmsOp] = useState<string>('SELECT')

  const isPhysical = activeType === 'physical'
  const currentStorageDetail = STORAGE_METHODS_CATALOG[selectedStorage]
  const currentIndexDetail = INDEX_STRUCTURES_CATALOG[selectedIndex]
  const currentDbmsOpDetail = DBMS_OPERATIONS_CATALOG.find((op) => op.id === selectedDbmsOp)

  // Map column to its rich metadata definition
  const getColDef = (colName: string) =>
    REALISTIC_STUDENT_COLUMNS.find((c) => c.name.toLowerCase() === colName.toLowerCase())

  return (
    <Card glass style={{ borderColor: 'rgba(99,102,241,0.3)' }} className="shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              <CardTitle className="text-base font-bold">Simulation & Operation Controls</CardTitle>
            </div>
            <CardDescription className="text-xs mt-0.5">
              Configure physical storage structures, mutate logical schemas, or inspect DBMS operations across the Three-Schema layers.
            </CardDescription>
          </div>

          {/* Controls Mode Tabs */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="inline-flex p-1 rounded-xl border shrink-0"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <button
                type="button"
                id="type-physical-btn"
                onClick={() => {
                  onTypeChange('physical')
                  setActiveTab('simulation')
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'simulation' && isPhysical
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Physical Independence</span>
              </button>
              <button
                type="button"
                id="type-logical-btn"
                onClick={() => {
                  onTypeChange('logical')
                  setActiveTab('simulation')
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'simulation' && !isPhysical
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Logical Independence</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('operations')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'operations'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>12 DBMS Operations</span>
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-4">
        {activeTab === 'operations' ? (
          /* ─── 12 DBMS OPERATIONS EXPLORER ─── */
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border text-xs bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-500/25 text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">DBMS Operations Explorer:</strong> Inspect how standard SQL DQL, DML, DDL, and relational operators interact with the Three-Schema architecture, and how physical vs. logical data independence insulates queries.
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {DBMS_OPERATIONS_CATALOG.map((op) => (
                <button
                  key={op.id}
                  onClick={() => setSelectedDbmsOp(op.id)}
                  className={`p-2 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                    selectedDbmsOp === op.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {op.id}
                </button>
              ))}
            </div>

            {currentDbmsOpDetail && (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {currentDbmsOpDetail.label}
                    </span>
                    <Badge variant="purple" size="sm">
                      {currentDbmsOpDetail.category}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                    {currentDbmsOpDetail.syntaxExample}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentDbmsOpDetail.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block">External Layer Impact</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{currentDbmsOpDetail.externalImpact}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">Logical Layer Impact</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{currentDbmsOpDetail.logicalImpact}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Physical Layer Impact</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{currentDbmsOpDetail.physicalImpact}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/25 text-indigo-900 dark:text-indigo-200">
                  <span className="font-bold block mb-1">Pedagogical Data Independence Insight:</span>
                  <span>{currentDbmsOpDetail.dataIndependenceNote}</span>
                </div>
              </div>
            )}
          </div>
        ) : isPhysical ? (
          /* ─── PHYSICAL INDEPENDENCE CONTROLS ─── */
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl border text-xs bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-500/25 text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white">Physical Data Independence:</strong> Modify underlying file storage organizations, page layouts, or index access paths. The logical relation schema (`STUDENT`) and external view (`Student View`) remain completely unaffected.
              </div>
              <button
                type="button"
                onClick={() => setShowMethodDetails((prev) => !prev)}
                className="ml-3 shrink-0 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {showMethodDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Storage Method Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="storage-method-select" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Storage Layout (10 Methods)
                  </label>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                    Category: {currentStorageDetail.category}
                  </span>
                </div>
                <select
                  id="storage-method-select"
                  value={selectedStorage}
                  onChange={(e) => onStorageChange(e.target.value as StorageMethod)}
                  style={inputStyle}
                >
                  <option value="heap">Heap File (Unordered append-only records)</option>
                  <option value="sequential">Sequential File (Sorted by Primary Key)</option>
                  <option value="btree">B+ Tree Organization (Clustered search tree)</option>
                  <option value="hash">Hash Storage (Direct bucket hash access)</option>
                  <option value="clustered">Clustered Storage (Related records colocated)</option>
                  <option value="columnar">Column-Oriented Storage (Vectorized OLAP)</option>
                  <option value="isa">Indexed Sequential Access (ISAM hierarchy)</option>
                  <option value="lsm">Log-Structured Merge Tree (LSM memtable/SSTable)</option>
                  <option value="partitioned">Partitioned Storage (Horizontal pruning)</option>
                  <option value="row">Row-Oriented Storage (Classic OLTP tuple slot)</option>
                </select>
                <span className="text-[11px] block text-slate-500">
                  Current: <strong className="text-slate-700 dark:text-slate-300">{formatStorageMethod(simState.physicalSchema.storageMethod)}</strong>
                </span>
              </div>

              {/* Index Structure Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="index-structure-select" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Index Structure (10 Types)
                  </label>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                    Category: {currentIndexDetail.category}
                  </span>
                </div>
                <select
                  id="index-structure-select"
                  value={selectedIndex}
                  onChange={(e) => onIndexChange(e.target.value as IndexType)}
                  style={inputStyle}
                >
                  <option value="none">None (Full sequential table scan)</option>
                  <option value="primary">Primary Index (Sparse index over sorted key)</option>
                  <option value="secondary">Secondary Index (Dense index on candidate key)</option>
                  <option value="btree">B+ Tree Index (Multi-level search tree)</option>
                  <option value="hash">Hash Index (O(1) exact equality lookups)</option>
                  <option value="bitmap">Bitmap Index (Bit array for low cardinality)</option>
                  <option value="dense">Dense Index (Entry for every record key)</option>
                  <option value="sparse">Sparse Index (Block anchor entries only)</option>
                  <option value="clustered">Clustered Index (Leaf nodes contain actual rows)</option>
                  <option value="composite">Composite Index (Multi-column compound keys)</option>
                </select>
                <span className="text-[11px] block text-slate-500">
                  Current: <strong className="text-slate-700 dark:text-slate-300">{formatIndexType(simState.physicalSchema.indexType)}</strong>
                </span>
              </div>
            </div>

            {/* Educational Metadata Preview for Storage & Index */}
            {showMethodDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{currentStorageDetail.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-500">How it works</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {currentStorageDetail.howItWorks}
                  </p>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-300 pt-0.5">
                    <strong>Use Case:</strong> {currentStorageDetail.useCase}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{currentIndexDetail.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-500">Mechanism</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {currentIndexDetail.workingPrinciple}
                  </p>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 pt-0.5">
                    <strong>Advantage:</strong> {currentIndexDetail.advantages[0]}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ─── LOGICAL INDEPENDENCE CONTROLS ─── */
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border text-xs bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-500/25 text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">Logical Data Independence:</strong> Modify the conceptual structure (columns) of table `STUDENT`. External user queries and views remain insulated unless they directly reference the removed attribute.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="logical-operation-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Operation
                </label>
                <select
                  id="logical-operation-select"
                  value={selectedLogicalOp}
                  onChange={(e) => onLogicalOpChange(e.target.value as LogicalOperation)}
                  style={inputStyle}
                >
                  <option value="add">Add Column</option>
                  <option value="remove">Remove Column</option>
                  <option value="rename">Rename Column</option>
                </select>
              </div>

              {selectedLogicalOp === 'add' && (
                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="add-column-select" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Column to Add (15 Realistic Student Attributes)
                    </label>
                    {getColDef(selectedColumn) && (
                      <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                        Type: {getColDef(selectedColumn)?.dataType}
                      </span>
                    )}
                  </div>
                  <select
                    id="add-column-select"
                    value={selectedColumn}
                    onChange={(e) => onColumnChange(e.target.value)}
                    style={inputStyle}
                  >
                    {ALLOWED_ADD_COLUMNS.map((col) => {
                      const exists = simState.logicalSchema.columns.includes(col)
                      const def = getColDef(col)
                      return (
                        <option key={col} value={col} disabled={exists}>
                          {col} {def ? `(${def.dataType})` : ''} {exists ? '— [Already in Table]' : ''}
                        </option>
                      )
                    })}
                  </select>
                  <span className="text-[11px] block text-slate-500">
                    {getColDef(selectedColumn)?.description || 'Select an attribute to append to the relation.'}
                  </span>
                </div>
              )}

              {selectedLogicalOp === 'remove' && (
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="remove-column-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Column to Remove
                  </label>
                  <select
                    id="remove-column-select"
                    value={selectedColumn}
                    onChange={(e) => onColumnChange(e.target.value)}
                    style={inputStyle}
                  >
                    {simState.logicalSchema.columns.map((col) => {
                      const isExternal = ['student_id', 'name', 'course', 'gpa'].includes(col)
                      const def = getColDef(col)
                      return (
                        <option key={col} value={col}>
                          {col} {def ? `(${def.dataType})` : ''} &bull; {isExternal ? '[Projected in External View - BREAKS MAPPING]' : '[Extension Column - SAFE TO DROP]'}
                        </option>
                      )
                    })}
                  </select>
                  <span className="text-[11px] block text-slate-500">
                    Removing an unprojected column preserves views; removing a projected column tests the boundary.
                  </span>
                </div>
              )}

              {selectedLogicalOp === 'rename' && (
                <>
                  <div className="space-y-1.5">
                    <label htmlFor="rename-source-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Existing Column
                    </label>
                    <select
                      id="rename-source-select"
                      value={selectedColumn}
                      onChange={(e) => {
                        onColumnChange(e.target.value)
                        onNewColumnNameChange(`${e.target.value}_updated`)
                      }}
                      style={inputStyle}
                    >
                      {simState.logicalSchema.columns.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="rename-target-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      New Column Name
                    </label>
                    <input
                      id="rename-target-input"
                      type="text"
                      value={newColumnName}
                      onChange={(e) => onNewColumnNameChange(e.target.value)}
                      placeholder="e.g. program"
                      style={{ ...inputStyle, fontFamily: 'JetBrains Mono, monospace' }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Validation Error Alert */}
        {validationError && (
          <div
            className="p-3.5 rounded-xl border text-xs flex items-center gap-2.5 animate-in fade-in"
            style={{
              backgroundColor: 'rgba(245,158,11,0.08)',
              borderColor: 'rgba(245,158,11,0.3)',
              color: '#d97706',
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div
          className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="text-xs flex items-center gap-2 text-slate-600 dark:text-slate-400">
            {isPhysical ? (
              <span>Target: Internal Physical Organization & Block Allocations</span>
            ) : selectedLogicalOp === 'add' ? (
              <span className="flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5 text-emerald-500" />
                Will append attribute to STUDENT relation catalog
              </span>
            ) : selectedLogicalOp === 'remove' ? (
              <span className="flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                Will drop attribute from STUDENT relation catalog
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                Will map renamed attribute via DBMS view aliasing
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button
              id="reset-simulation-btn"
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={onReset}
            >
              Reset Initial Schemas
            </Button>
            <Button
              id="apply-change-btn"
              variant="primary"
              size="md"
              icon={<Zap className="w-4 h-4 fill-white" />}
              onClick={onApplyChange}
            >
              Apply Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
