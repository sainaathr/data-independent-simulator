import type { ExperimentPreset } from '../types/simulation'

/**
 * Predefined experiment presets for the Experiments Lab.
 * Each maps directly to a SimulationChange that can be fed into evaluateSimulation().
 */
export const EXPERIMENT_PRESETS: ExperimentPreset[] = [
  {
    id: 'EXP-01',
    title: 'B+ Tree Index Addition',
    type: 'Physical Independence',
    independenceType: 'physical',
    badgeVariant: 'info',
    difficulty: 'Beginner',
    scenario:
      'Add a B+ Tree index on STUDENT(student_id) without altering the conceptual schema or external view.',
    educationalGoal:
      'Demonstrate that changing the indexing strategy — a physical-level detail — does not require any modification to the logical schema or external application queries.',
    change: {
      type: 'physical',
      storageMethod: 'btree',
      indexType: 'btree',
    },
    expectedOutcome:
      'Physical schema changes. Logical and External schemas remain UNCHANGED. Physical Data Independence is MAINTAINED.',
  },
  {
    id: 'EXP-02',
    title: 'Hash Storage Migration',
    type: 'Physical Independence',
    independenceType: 'physical',
    badgeVariant: 'info',
    difficulty: 'Beginner',
    scenario:
      'Migrate STUDENT table storage from Heap File to Hash Storage to improve equality lookups.',
    educationalGoal:
      'Show that reorganizing the physical storage format (hash vs heap) is transparent to the logical and external layers.',
    change: {
      type: 'physical',
      storageMethod: 'hash',
      indexType: 'primary',
    },
    expectedOutcome:
      'Physical schema reflects new storage method. Logical and External schemas remain UNCHANGED. Physical Data Independence is MAINTAINED.',
  },
  {
    id: 'EXP-03',
    title: 'Add New Attribute (Email)',
    type: 'Logical Independence',
    independenceType: 'logical',
    badgeVariant: 'purple',
    difficulty: 'Beginner',
    scenario:
      'Add an "email" column to the STUDENT logical table to track student contact information.',
    educationalGoal:
      'Demonstrate that adding a new column to the logical schema does not break existing external views that do not reference the new attribute.',
    change: {
      type: 'logical',
      operation: 'add',
      column: 'email',
    },
    expectedOutcome:
      'Logical schema gains "email" column. External Student View remains UNCHANGED. Logical Data Independence is MAINTAINED.',
  },
  {
    id: 'EXP-04',
    title: 'Rename Column (course → program)',
    type: 'Logical Independence',
    independenceType: 'logical',
    badgeVariant: 'purple',
    difficulty: 'Intermediate',
    scenario:
      'Rename the "course" attribute to "program" in the logical schema to better align with institutional terminology.',
    educationalGoal:
      'Show that the DBMS External-to-Conceptual mapping can absorb column renames, preserving external view stability.',
    change: {
      type: 'logical',
      operation: 'rename',
      column: 'course',
      newColumnName: 'program',
    },
    expectedOutcome:
      'Logical schema reflects renamed column. External Student View remains UNCHANGED via mapping alias. Logical Data Independence is MAINTAINED.',
  },
  {
    id: 'EXP-05',
    title: 'Remove Non-Projected Attribute',
    type: 'Logical Independence',
    independenceType: 'logical',
    badgeVariant: 'purple',
    difficulty: 'Intermediate',
    scenario:
      'Add a "department" column first, then remove it — a column not referenced by the external view.',
    educationalGoal:
      'Show that removing a column not used in the external view preserves logical data independence.',
    change: {
      type: 'logical',
      operation: 'add',
      column: 'department',
    },
    expectedOutcome:
      'Logical schema adds "department". External Student View remains UNCHANGED. Logical Data Independence is MAINTAINED.',
  },
  {
    id: 'EXP-06',
    title: 'Sequential File Reorganization',
    type: 'Physical Independence',
    independenceType: 'physical',
    badgeVariant: 'info',
    difficulty: 'Advanced',
    scenario:
      'Reorganize STUDENT storage from Heap File to Sequential ordered file with a secondary index for ordered scans.',
    educationalGoal:
      'Demonstrate that complex physical reorganization (storage method + index type change) remains invisible to all logical and external layers.',
    change: {
      type: 'physical',
      storageMethod: 'sequential',
      indexType: 'secondary',
    },
    expectedOutcome:
      'Physical schema shows Sequential storage with Secondary Index. Logical and External schemas remain UNCHANGED. Physical Data Independence is MAINTAINED.',
  },
]
