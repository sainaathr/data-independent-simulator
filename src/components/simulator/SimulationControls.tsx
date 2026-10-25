import React from 'react'
import {
  HardDrive,
  Network,
  Zap,
  RotateCcw,
  AlertCircle,
  PlusCircle,
  Trash2,
  Edit3,
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'

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
  padding: '0.5rem 0.75rem',
  borderRadius: '0.75rem',
  fontSize: '0.875rem',
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
  const isPhysical = activeType === 'physical'

  return (
    <Card glass style={{ borderColor: 'rgba(99,102,241,0.3)' }} className="shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              <span>Simulation Controls</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Select simulation type, configure schema parameters, and observe architectural impact.
            </CardDescription>
          </div>

          <div
            className="inline-flex p-1 rounded-xl border shrink-0"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            <button
              type="button"
              id="type-physical-btn"
              onClick={() => onTypeChange('physical')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              style={isPhysical ? { backgroundColor: '#6366f1', color: '#ffffff' } : { color: 'var(--fg-muted)' }}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Physical Data Independence</span>
            </button>
            <button
              type="button"
              id="type-logical-btn"
              onClick={() => onTypeChange('logical')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              style={!isPhysical ? { backgroundColor: '#6366f1', color: '#ffffff' } : { color: 'var(--fg-muted)' }}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Logical Data Independence</span>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-4">
        {isPhysical ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border text-xs" style={{ backgroundColor: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.25)', color: 'var(--fg-muted)' }}>
              <strong style={{ color: 'var(--fg)' }}>Physical Data Independence:</strong> Modify underlying file structures, page layouts, or index access paths. The logical schema (`STUDENT`) and external view (`Student View`) remain completely unaffected.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="storage-method-select" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Storage Method</label>
                <select id="storage-method-select" value={selectedStorage} onChange={(e) => onStorageChange(e.target.value as StorageMethod)} style={inputStyle}>
                  <option value="heap">Heap File (Unordered Records)</option>
                  <option value="sequential">Sequential File (Sorted by Primary Key)</option>
                  <option value="btree">B+ Tree (Clustered Index Organization)</option>
                  <option value="hash">Hash Storage (Direct Bucket Hash Access)</option>
                  <option value="clustered">Clustered Storage (Physically Grouped)</option>
                  <option value="columnar">Column-Oriented Storage (Analytics)</option>
                  <option value="isa">Indexed Sequential Access (ISAM)</option>
                  <option value="lsm">Log-Structured Merge Tree (LSM)</option>
                  <option value="partitioned">Partitioned Storage (Horizontal)</option>
                  <option value="row">Row-Oriented Storage (OLTP)</option>
                </select>
                <span className="text-[11px] block" style={{ color: 'var(--fg-subtle)' }}>
                  Current: <strong style={{ color: 'var(--fg-muted)' }}>{formatStorageMethod(simState.physicalSchema.storageMethod)}</strong>
                </span>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="index-structure-select" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Index Structure</label>
                <select id="index-structure-select" value={selectedIndex} onChange={(e) => onIndexChange(e.target.value as IndexType)} style={inputStyle}>
                  <option value="none">None (Full Table Scan)</option>
                  <option value="primary">Primary Index (Dense Key Index)</option>
                  <option value="secondary">Secondary Index (Candidate Key Index)</option>
                  <option value="btree">B+ Tree Index (Multi-level Index Tree)</option>
                  <option value="hash">Hash Index (Equality Lookups)</option>
                  <option value="bitmap">Bitmap Index (Low Cardinality)</option>
                  <option value="dense">Dense Index (All Search Keys)</option>
                  <option value="sparse">Sparse Index (Block Anchors Only)</option>
                  <option value="clustered">Clustered Index (Physical Order)</option>
                  <option value="composite">Composite Index (Multi-Column)</option>
                </select>
                <span className="text-[11px] block" style={{ color: 'var(--fg-subtle)' }}>
                  Current: <strong style={{ color: 'var(--fg-muted)' }}>{formatIndexType(simState.physicalSchema.indexType)}</strong>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border text-xs" style={{ backgroundColor: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.25)', color: 'var(--fg-muted)' }}>
              <strong style={{ color: 'var(--fg)' }}>Logical Data Independence:</strong> Modify the conceptual structure (columns) of table `STUDENT`. External user queries and views remain insulated unless they directly reference the removed attribute.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="logical-operation-select" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Operation</label>
                <select id="logical-operation-select" value={selectedLogicalOp} onChange={(e) => onLogicalOpChange(e.target.value as LogicalOperation)} style={inputStyle}>
                  <option value="add">Add Column</option>
                  <option value="remove">Remove Column</option>
                  <option value="rename">Rename Column</option>
                </select>
              </div>

              {selectedLogicalOp === 'add' && (
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="add-column-select" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Column to Add</label>
                  <select id="add-column-select" value={selectedColumn} onChange={(e) => onColumnChange(e.target.value)} style={inputStyle}>
                    {ALLOWED_ADD_COLUMNS.map((col) => {
                      const exists = simState.logicalSchema.columns.includes(col)
                      return (
                        <option key={col} value={col} disabled={exists}>
                          {col} {exists ? '(Already in Schema)' : ''}
                        </option>
                      )
                    })}
                  </select>
                  <span className="text-[11px] block" style={{ color: 'var(--fg-subtle)' }}>
                    Available: email, phone, department, semester, age, gender, date_of_birth, address, city, fees_status
                  </span>
                </div>
              )}

              {selectedLogicalOp === 'remove' && (
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="remove-column-select" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Column to Remove</label>
                  <select id="remove-column-select" value={selectedColumn} onChange={(e) => onColumnChange(e.target.value)} style={inputStyle}>
                    {simState.logicalSchema.columns.map((col) => {
                      const isExternal = ['student_id', 'name', 'course', 'gpa'].includes(col)
                      return (
                        <option key={col} value={col}>
                          {col} {isExternal ? '(Referenced by External View)' : '(Extension Attribute)'}
                        </option>
                      )
                    })}
                  </select>
                  <span className="text-[11px] block" style={{ color: 'var(--fg-subtle)' }}>
                    Removing an unprojected column preserves views; removing a projected column tests the boundary.
                  </span>
                </div>
              )}

              {selectedLogicalOp === 'rename' && (
                <>
                  <div className="space-y-1.5">
                    <label htmlFor="rename-source-select" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>Existing Column</label>
                    <select id="rename-source-select" value={selectedColumn} onChange={(e) => { onColumnChange(e.target.value); onNewColumnNameChange(`${e.target.value}_updated`) }} style={inputStyle}>
                      {simState.logicalSchema.columns.map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="rename-target-input" className="block text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>New Column Name</label>
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

        {validationError && (
          <div className="p-3 rounded-xl border text-xs flex items-center gap-2" style={{ backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.3)', color: '#d97706' }}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
          <div className="text-xs flex items-center gap-2" style={{ color: 'var(--fg-muted)' }}>
            {isPhysical ? (
              <span>Target: Internal Physical Organization</span>
            ) : selectedLogicalOp === 'add' ? (
              <span className="flex items-center gap-1"><PlusCircle className="w-3.5 h-3.5 text-emerald-500" /> Will append to STUDENT relation</span>
            ) : selectedLogicalOp === 'remove' ? (
              <span className="flex items-center gap-1"><Trash2 className="w-3.5 h-3.5 text-rose-500" /> Will drop from STUDENT relation</span>
            ) : (
              <span className="flex items-center gap-1"><Edit3 className="w-3.5 h-3.5 text-indigo-500" /> Will map renamed attribute via DBMS view</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button id="reset-simulation-btn" variant="outline" size="md" icon={<RotateCcw className="w-4 h-4" />} onClick={onReset}>
              Reset Simulation
            </Button>
            <Button id="apply-change-btn" variant="primary" size="md" icon={<Zap className="w-4 h-4 fill-white" />} onClick={onApplyChange}>
              Apply Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
