import type {
  ExternalSchema,
  LogicalSchema,
  PhysicalSchema,
  StorageMethod,
  IndexType,
  LogicalOperation,
  SimulationChange,
  SimulationResult,
  SimulationState,
  SchemaDiff,
} from '../types/simulation'

export const INITIAL_EXTERNAL_SCHEMA: ExternalSchema = {
  name: 'Student View',
  fields: ['Student ID', 'Name', 'Course', 'GPA'],
  description: 'Application perspective used by academic advisor portal',
}

export const INITIAL_LOGICAL_SCHEMA: LogicalSchema = {
  name: 'STUDENT',
  columns: ['student_id', 'name', 'course', 'gpa'],
  primaryKey: 'student_id',
}

export const INITIAL_PHYSICAL_SCHEMA: PhysicalSchema = {
  storageMethod: 'heap',
  indexType: 'none',
  pages: 10,
  records: 100,
}

export const ALLOWED_ADD_COLUMNS = [
  'email', 'phone', 'department', 'semester', 'age',
  'gender', 'date_of_birth', 'address', 'city', 'fees_status'
] as const

export function formatStorageMethod(method: StorageMethod): string {
  switch (method) {
    case 'heap': return 'Heap File'
    case 'sequential': return 'Sequential File'
    case 'btree': return 'B+ Tree'
    case 'hash': return 'Hash Storage'
    case 'clustered': return 'Clustered Storage'
    case 'columnar': return 'Column-Oriented'
    case 'isa': return 'Indexed Sequential (ISAM)'
    case 'lsm': return 'Log-Structured Merge Tree'
    case 'partitioned': return 'Partitioned Storage'
    case 'row': return 'Row-Oriented Storage'
    default: return method
  }
}

export function formatIndexType(index: IndexType): string {
  switch (index) {
    case 'none': return 'None'
    case 'primary': return 'Primary Index'
    case 'secondary': return 'Secondary Index'
    case 'btree': return 'B+ Tree Index'
    case 'hash': return 'Hash Index'
    case 'bitmap': return 'Bitmap Index'
    case 'dense': return 'Dense Index'
    case 'sparse': return 'Sparse Index'
    case 'clustered': return 'Clustered Index'
    case 'composite': return 'Composite Index'
    default: return index
  }
}

export function formatLogicalOperation(op: LogicalOperation): string {
  switch (op) {
    case 'add':
      return 'Add Column'
    case 'remove':
      return 'Remove Column'
    case 'rename':
      return 'Rename Column'
    default:
      return op
  }
}

export function getInitialSimulationState(): SimulationState {
  return {
    externalSchema: { ...INITIAL_EXTERNAL_SCHEMA, fields: [...INITIAL_EXTERNAL_SCHEMA.fields] },
    logicalSchema: { ...INITIAL_LOGICAL_SCHEMA, columns: [...INITIAL_LOGICAL_SCHEMA.columns] },
    physicalSchema: { ...INITIAL_PHYSICAL_SCHEMA },
    storageMethod: INITIAL_PHYSICAL_SCHEMA.storageMethod,
    indexType: INITIAL_PHYSICAL_SCHEMA.indexType,
    selectedIndependenceType: 'physical',
    selectedChange: null,
    simulationResult: null,
    previousSchemas: undefined,
  }
}

/**
 * Validates a proposed physical schema change.
 * Returns an error string if invalid, or null if valid.
 */
export function validatePhysicalChange(
  currentState: SimulationState,
  newStorageMethod: StorageMethod,
  newIndexType: IndexType
): string | null {
  const currentStorage = currentState.physicalSchema.storageMethod
  const currentIndex = currentState.physicalSchema.indexType

  if (currentStorage === newStorageMethod && currentIndex === newIndexType) {
    return `Storage is already "${formatStorageMethod(newStorageMethod)}" with index "${formatIndexType(newIndexType)}". Select a different configuration to simulate.`
  }

  return null
}

/**
 * Validates a proposed logical schema operation.
 * Returns an error string if invalid, or null if valid.
 */
export function validateLogicalChange(
  currentState: SimulationState,
  operation: LogicalOperation,
  columnName?: string,
  newColumnName?: string
): string | null {
  const currentCols = currentState.logicalSchema.columns

  if (operation === 'add') {
    if (!columnName || !columnName.trim()) {
      return 'Please select a column to add.'
    }
    const cleanCol = columnName.trim().toLowerCase()
    if (currentCols.map((c) => c.toLowerCase()).includes(cleanCol)) {
      return `Column "${cleanCol}" already exists in the logical schema.`
    }
  }

  if (operation === 'remove') {
    if (!columnName || !columnName.trim()) {
      return 'Please select a column to remove.'
    }
    const cleanCol = columnName.trim().toLowerCase()
    if (!currentCols.map((c) => c.toLowerCase()).includes(cleanCol)) {
      return `Column "${cleanCol}" does not exist in the logical schema.`
    }
    if (currentCols.length <= 1) {
      return 'Cannot remove the last remaining column from the table.'
    }
  }

  if (operation === 'rename') {
    if (!columnName || !columnName.trim()) {
      return 'Please select an existing column to rename.'
    }
    const sourceCol = columnName.trim().toLowerCase()
    if (!currentCols.map((c) => c.toLowerCase()).includes(sourceCol)) {
      return `Column "${sourceCol}" does not exist in the logical schema.`
    }
    if (!newColumnName || !newColumnName.trim()) {
      return 'Please provide a valid new column name.'
    }
    const targetCol = newColumnName.trim().toLowerCase()
    if (targetCol === sourceCol) {
      return `New column name must be different from the current name "${sourceCol}".`
    }
    if (currentCols.map((c) => c.toLowerCase()).includes(targetCol)) {
      return `A column named "${targetCol}" already exists in the logical schema.`
    }
  }

  return null
}

/**
 * Evaluates a Physical Storage / Index structure change.
 * Physical Data Independence:
 * The physical storage or indexing changes, but the conceptual schema (STUDENT)
 * and the external view (Student View) remain completely UNCHANGED.
 */
export function evaluatePhysicalChange(
  currentState: SimulationState,
  newStorageMethod: StorageMethod,
  newIndexType: IndexType
): { updatedPhysical: PhysicalSchema; result: SimulationResult } {
  // Page calculation: storage method base pages + index overhead
  let calculatedPages = 10
  if (newStorageMethod === 'btree') calculatedPages = 14
  else if (newStorageMethod === 'hash') calculatedPages = 12
  else if (newStorageMethod === 'sequential') calculatedPages = 10
  else calculatedPages = 10

  if (newIndexType === 'btree') calculatedPages += 4
  else if (newIndexType === 'secondary') calculatedPages += 2
  else if (newIndexType === 'primary') calculatedPages += 1

  const isPhysicalChanged =
    currentState.physicalSchema.storageMethod !== newStorageMethod ||
    currentState.physicalSchema.indexType !== newIndexType

  const updatedPhysical: PhysicalSchema = {
    storageMethod: newStorageMethod,
    indexType: newIndexType,
    pages: calculatedPages,
    records: currentState.physicalSchema.records,
  }

  const propertyChanges: { label: string; from: string; to: string }[] = []
  if (currentState.physicalSchema.storageMethod !== newStorageMethod) {
    propertyChanges.push({
      label: 'Storage Method',
      from: formatStorageMethod(currentState.physicalSchema.storageMethod),
      to: formatStorageMethod(newStorageMethod),
    })
  }
  if (currentState.physicalSchema.indexType !== newIndexType) {
    propertyChanges.push({
      label: 'Index Structure',
      from: formatIndexType(currentState.physicalSchema.indexType),
      to: formatIndexType(newIndexType),
    })
  }

  const diff: SchemaDiff = {
    level: 'physical',
    description: `Physical configuration updated to ${formatStorageMethod(newStorageMethod)} with ${formatIndexType(newIndexType)}`,
    propertyChanges,
  }

  const result: SimulationResult = {
    externalImpact: 'UNCHANGED',
    logicalImpact: 'UNCHANGED',
    physicalImpact: isPhysicalChanged ? 'CHANGED' : 'UNCHANGED',
    independenceStatus: 'MAINTAINED',
    independenceType: 'physical',
    title: 'Physical Data Independence Maintained',
    changeSummary: `Physical storage updated to ${formatStorageMethod(newStorageMethod)} with ${formatIndexType(newIndexType)}`,
    explanation:
      'Changing physical storage structures affects the physical level while the logical schema and external view remain unchanged. Therefore the application can continue using the same logical structure.',
    whyPoints: [
      `Physical storage altered from ${formatStorageMethod(currentState.physicalSchema.storageMethod)} (${formatIndexType(currentState.physicalSchema.indexType)}) to ${formatStorageMethod(newStorageMethod)} (${formatIndexType(newIndexType)}).`,
      'The conceptual logical schema (STUDENT table structure and columns) was completely unaffected.',
      'The external user view (Student View) and application queries require zero modifications.',
      'The DBMS conceptual-to-internal mapping absorbed the storage changes transparently.',
    ],
    timestamp: Date.now(),
    diff,
  }

  return { updatedPhysical, result }
}

/**
 * Checks if a logical column maps directly to a field in the Student View
 */
function isColumnInExternalView(colName: string): boolean {
  const normalized = colName.toLowerCase().replace(/_/g, '')
  const externalFields = ['studentid', 'name', 'course', 'gpa']
  return externalFields.includes(normalized)
}

/**
 * Evaluates a Logical Schema change (Add, Remove, or Rename column).
 * Logical Data Independence:
 * Capacity to change the conceptual schema while preserving existing external views.
 */
export function evaluateLogicalChange(
  currentState: SimulationState,
  operation: LogicalOperation,
  columnName?: string,
  newColumnName?: string
): {
  updatedLogical: LogicalSchema
  updatedExternal: ExternalSchema
  updatedPhysical: PhysicalSchema
  result: SimulationResult
} {
  const currentColumns = [...currentState.logicalSchema.columns]
  let nextColumns = [...currentColumns]
  let nextExternalFields = [...currentState.externalSchema.fields]
  let nextPages = currentState.physicalSchema.pages

  let externalImpact: 'UNCHANGED' | 'CHANGED' = 'UNCHANGED'
  const logicalImpact: 'UNCHANGED' | 'CHANGED' = 'CHANGED'
  const physicalImpact: 'UNCHANGED' | 'CHANGED' = 'CHANGED'
  let independenceStatus: 'MAINTAINED' | 'AFFECTED' = 'MAINTAINED'
  let title = ''
  let explanation = ''
  let changeSummary = ''
  const whyPoints: string[] = []
  let diff: SchemaDiff

  if (operation === 'add') {
    const colToAdd = (columnName || 'email').trim().toLowerCase()
    if (!nextColumns.includes(colToAdd)) {
      nextColumns.push(colToAdd)
      nextPages += 1 // Adding attributes increases tuple width / page allocation
    }

    title = 'Logical Data Independence Maintained (Column Added)'
    changeSummary = `Added column "${colToAdd}" to logical table STUDENT`
    explanation =
      'Changing the logical schema affects the conceptual structure. External views can remain stable when the change does not require modification to those views.'

    whyPoints.push(`Logical table STUDENT expanded to include new attribute: "${colToAdd}".`)
    whyPoints.push('Physical representation adapted: allocated additional storage space for wider tuples.')
    whyPoints.push(
      'External "Student View" remains UNCHANGED because it projects only its required fields (Student ID, Name, Course, GPA).'
    )
    whyPoints.push('The external-to-conceptual mapping safely ignores unreferenced attributes.')

    diff = {
      level: 'logical',
      description: `Added column "${colToAdd}" to table STUDENT`,
      added: [colToAdd],
    }
  } else if (operation === 'remove') {
    const colToRemove = (columnName || 'email').trim().toLowerCase()
    const isPresent = nextColumns.includes(colToRemove)

    if (isPresent) {
      nextColumns = nextColumns.filter((c) => c !== colToRemove)
      if (nextPages > 10) nextPages -= 1
    }

    const affectsExternalView = isColumnInExternalView(colToRemove)

    if (affectsExternalView) {
      externalImpact = 'CHANGED'
      independenceStatus = 'AFFECTED'
      title = 'Logical Data Independence Affected (Projected Column Removed)'
      changeSummary = `Removed projected column "${colToRemove}" from table STUDENT`
      explanation =
        'Removing a column that is directly queried by the external view breaks the external-to-conceptual mapping. In this case, logical data independence is affected unless the external view is explicitly updated or compensated with a fallback.'

      // Remove corresponding field from external view
      nextExternalFields = nextExternalFields.filter((f) => {
        const normField = f.toLowerCase().replace(/ /g, '')
        const normCol = colToRemove.toLowerCase().replace(/_/g, '')
        return normField !== normCol
      })

      whyPoints.push(`Column "${colToRemove}" was dropped from conceptual table STUDENT.`)
      whyPoints.push('External "Student View" depended directly on this attribute.')
      whyPoints.push(
        'Existing client queries expecting this column encounter schema errors, requiring code modifications.'
      )

      diff = {
        level: 'logical',
        description: `Removed projected column "${colToRemove}" from table STUDENT`,
        removed: [colToRemove],
      }
    } else {
      title = 'Logical Data Independence Maintained (Unprojected Column Removed)'
      changeSummary = `Removed unprojected column "${colToRemove}" from table STUDENT`
      explanation =
        'Changing the logical schema affects the conceptual structure. External views can remain stable when the change does not require modification to those views.'

      whyPoints.push(`Attribute "${colToRemove}" was removed from the conceptual schema.`)
      whyPoints.push(
        'Because the external view never requested this attribute, external queries continue uninterrupted.'
      )
      whyPoints.push('The external-to-conceptual mapping remains intact and valid.')

      diff = {
        level: 'logical',
        description: `Removed unprojected column "${colToRemove}" from table STUDENT`,
        removed: [colToRemove],
      }
    }
  } else {
    // rename
    const oldName = (columnName || 'course').trim().toLowerCase()
    const targetName = (newColumnName || `${oldName}_renamed`).trim().toLowerCase()

    if (nextColumns.includes(oldName) && targetName) {
      nextColumns = nextColumns.map((c) => (c === oldName ? targetName : c))
    }

    title = 'Logical Data Independence Maintained (Column Renamed with Mapping)'
    changeSummary = `Renamed column "${oldName}" to "${targetName}" in table STUDENT`
    explanation =
      'Changing the logical schema affects the conceptual structure. External views can remain stable when the change does not require modification to those views.'

    whyPoints.push(`Conceptual column name updated from "${oldName}" to "${targetName}".`)
    whyPoints.push(
      'The DBMS External-to-Conceptual Mapping was updated: maps renamed attribute back to existing external alias.'
    )
    whyPoints.push(
      'External applications continue using the original field name without rewriting query code.'
    )

    diff = {
      level: 'logical',
      description: `Renamed column "${oldName}" to "${targetName}" in table STUDENT`,
      renamed: [{ from: oldName, to: targetName }],
    }
  }

  const updatedLogical: LogicalSchema = {
    ...currentState.logicalSchema,
    columns: nextColumns,
  }

  const updatedExternal: ExternalSchema = {
    ...currentState.externalSchema,
    fields: nextExternalFields,
  }

  const updatedPhysical: PhysicalSchema = {
    ...currentState.physicalSchema,
    pages: nextPages,
  }

  const result: SimulationResult = {
    externalImpact,
    logicalImpact,
    physicalImpact,
    independenceStatus,
    independenceType: 'logical',
    title,
    explanation,
    changeSummary,
    whyPoints,
    timestamp: Date.now(),
    diff,
  }

  return { updatedLogical, updatedExternal, updatedPhysical, result }
}

/**
 * Main pure evaluation function for any simulation change
 */
export function evaluateSimulation(
  currentState: SimulationState,
  change: SimulationChange
): SimulationState {
  const previousSchemas = {
    externalSchema: { ...currentState.externalSchema, fields: [...currentState.externalSchema.fields] },
    logicalSchema: { ...currentState.logicalSchema, columns: [...currentState.logicalSchema.columns] },
    physicalSchema: { ...currentState.physicalSchema },
  }

  if (change.type === 'physical') {
    const { updatedPhysical, result } = evaluatePhysicalChange(
      currentState,
      change.storageMethod,
      change.indexType
    )

    return {
      ...currentState,
      physicalSchema: updatedPhysical,
      storageMethod: change.storageMethod,
      indexType: change.indexType,
      selectedChange: change,
      simulationResult: result,
      previousSchemas,
    }
  }

  if (change.type === 'logical') {
    const { updatedLogical, updatedExternal, updatedPhysical, result } = evaluateLogicalChange(
      currentState,
      change.operation,
      change.column,
      change.newColumnName
    )

    return {
      ...currentState,
      logicalSchema: updatedLogical,
      externalSchema: updatedExternal,
      physicalSchema: updatedPhysical,
      selectedChange: change,
      simulationResult: result,
      previousSchemas,
    }
  }

  return currentState
}
