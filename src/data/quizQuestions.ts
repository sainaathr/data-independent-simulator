// src/data/quizQuestions.ts
// Questions extracted from Quiz_Questions.docx (uploaded project asset)
// All questions are from the source document without modification.

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface QuizQuestion {
  id: string
  question: string
  options: [string, string, string, string]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  difficulty: Difficulty
  topic: string
}

// ──────────────────────────────────────────────────────
// EASY (Q1–Q20): Definitional & single-concept questions
// ──────────────────────────────────────────────────────
export const easyQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is data independence?',
    options: [
      'Ability to store data without a database',
      'Ability to change one schema level without significantly affecting higher levels',
      'Ability to delete database records',
      'Ability to access a database without SQL',
    ],
    correctAnswer: 'B',
    explanation:
      'Data independence means the higher-level schema (e.g., conceptual or external) is insulated from changes made at a lower schema level (e.g., physical).',
    difficulty: 'easy',
    topic: 'Data Independence',
  },
  {
    id: 'q2',
    question: 'How many major types of data independence are there?',
    options: ['One', 'Two', 'Three', 'Four'],
    correctAnswer: 'B',
    explanation:
      'There are two major types: physical data independence and logical data independence.',
    difficulty: 'easy',
    topic: 'Data Independence',
  },
  {
    id: 'q3',
    question: 'The two types of data independence are:',
    options: [
      'External and internal',
      'Logical and physical',
      'Structural and functional',
      'Static and dynamic',
    ],
    correctAnswer: 'B',
    explanation:
      'The ANSI/SPARC model defines logical and physical data independence corresponding to the conceptual–external and conceptual–internal boundaries respectively.',
    difficulty: 'easy',
    topic: 'Data Independence',
  },
  {
    id: 'q4',
    question: 'Which architecture is closely associated with data independence?',
    options: [
      'Two-tier architecture',
      'Three-schema architecture',
      'Client-server architecture',
      'Peer-to-peer architecture',
    ],
    correctAnswer: 'B',
    explanation:
      'The ANSI/SPARC three-schema (three-level) architecture — external, conceptual, and internal — is the framework that enables data independence.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q5',
    question: 'The three levels of the ANSI/SPARC architecture are:',
    options: [
      'User, Application, Database',
      'External, Conceptual, Internal',
      'Physical, Logical, Network',
      'Input, Processing, Output',
    ],
    correctAnswer: 'B',
    explanation:
      'ANSI/SPARC defines External (user views), Conceptual (overall logical structure), and Internal (physical storage) schema levels.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q6',
    question: 'Which schema represents individual user views?',
    options: ['Internal schema', 'Conceptual schema', 'External schema', 'Physical schema'],
    correctAnswer: 'C',
    explanation:
      'The external schema (also called view level) represents the subset of the database relevant to a particular user or application.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q7',
    question: 'Which schema describes the overall logical structure of the database?',
    options: ['External', 'Conceptual', 'Internal', 'Storage'],
    correctAnswer: 'B',
    explanation:
      'The conceptual schema (also called logical schema) defines what data is stored, their types, relationships, and constraints — without implementation details.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q8',
    question: 'Which schema describes how data is physically stored?',
    options: ['External', 'Conceptual', 'Internal', 'User'],
    correctAnswer: 'C',
    explanation:
      'The internal schema (physical schema) describes the physical storage structure, including file organization, indexes, and storage allocation.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q9',
    question:
      'Changing file organization without changing the conceptual schema demonstrates:',
    options: [
      'Logical data independence',
      'Physical data independence',
      'Referential integrity',
      'Normalization',
    ],
    correctAnswer: 'B',
    explanation:
      'Physical data independence means the conceptual schema can remain unchanged even when the internal (physical) schema changes.',
    difficulty: 'easy',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q10',
    question:
      'Changing the conceptual schema without requiring changes to external views demonstrates:',
    options: [
      'Physical data independence',
      'Logical data independence',
      'Physical security',
      'Data redundancy',
    ],
    correctAnswer: 'B',
    explanation:
      'Logical data independence means external schemas (user views) do not need to change when the conceptual schema changes.',
    difficulty: 'easy',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q11',
    question:
      'Which type of data independence is generally concerned with changes to storage structures?',
    options: ['Logical', 'Physical', 'External', 'Conceptual'],
    correctAnswer: 'B',
    explanation:
      'Physical data independence shields higher schema levels from changes to storage structures such as file organization or indexing methods.',
    difficulty: 'easy',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q12',
    question: 'Which type is concerned with changes to the logical structure of the database?',
    options: [
      'Physical data independence',
      'Logical data independence',
      'Storage independence',
      'View independence',
    ],
    correctAnswer: 'B',
    explanation:
      'Logical data independence handles changes to the conceptual schema (e.g., adding attributes, splitting tables) without impacting external views.',
    difficulty: 'easy',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q13',
    question: "A user's view of the database belongs to which level?",
    options: ['External', 'Conceptual', 'Internal', 'Physical'],
    correctAnswer: 'A',
    explanation:
      'User views — the data visible to a particular user or application — reside at the external level of the three-schema architecture.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q14',
    question:
      'A table such as STUDENT(StudentID, Name, GPA) primarily represents the:',
    options: ['External level', 'Conceptual level', 'Internal level', 'Hardware level'],
    correctAnswer: 'B',
    explanation:
      'Relation definitions (tables, attributes, and their types) belong to the conceptual/logical schema level.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q15',
    question: 'Disk blocks, indexes, and file organizations are primarily associated with:',
    options: ['External schema', 'Conceptual schema', 'Internal schema', 'User schema'],
    correctAnswer: 'C',
    explanation:
      'These are all physical storage concerns described in the internal (physical) schema.',
    difficulty: 'easy',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q16',
    question: 'Which change is most clearly a physical-level change?',
    options: [
      'Adding a new table',
      'Renaming a column',
      'Creating a B+ tree index',
      'Adding an attribute to a relation',
    ],
    correctAnswer: 'C',
    explanation:
      'Creating a B+ tree index changes only the internal/physical schema — the logical structure of the data is unaffected.',
    difficulty: 'easy',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q17',
    question: 'Which change is most clearly a logical-level change?',
    options: [
      'Changing from HDD to SSD',
      'Creating a B+ tree index',
      'Adding a column to a relation',
      'Changing the page size',
    ],
    correctAnswer: 'C',
    explanation:
      'Adding a column modifies the conceptual/logical schema — the table definition changes, which can affect external views.',
    difficulty: 'easy',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q18',
    question: 'Data independence primarily reduces the dependency between:',
    options: [
      'Users and passwords',
      'Different levels of database abstraction',
      'CPU and memory',
      'Tables and SQL keywords',
    ],
    correctAnswer: 'B',
    explanation:
      'Data independence decouples the external, conceptual, and internal schema levels so changes at one level minimally affect others.',
    difficulty: 'easy',
    topic: 'Data Independence',
  },
  {
    id: 'q19',
    question: 'Which mapping connects the external schema to the conceptual schema?',
    options: [
      'External-conceptual mapping',
      'Conceptual-internal mapping',
      'Physical-external mapping',
      'User-storage mapping',
    ],
    correctAnswer: 'A',
    explanation:
      'The external-conceptual mapping transforms user view requests into conceptual schema terms, enabling logical data independence.',
    difficulty: 'easy',
    topic: 'Schema Mappings',
  },
  {
    id: 'q20',
    question: 'Which mapping connects the conceptual schema to the internal schema?',
    options: ['External mapping', 'Conceptual-internal mapping', 'User mapping', 'View mapping'],
    correctAnswer: 'B',
    explanation:
      'The conceptual-internal mapping translates logical schema operations into physical storage operations, enabling physical data independence.',
    difficulty: 'easy',
    topic: 'Schema Mappings',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MEDIUM (Q21–Q38): Applied / scenario-based questions
// ─────────────────────────────────────────────────────────────────────────────
export const mediumQuestions: QuizQuestion[] = [
  {
    id: 'q21',
    question:
      'A DBMS changes a heap file to a B+ tree-based storage structure. The application programs remain unchanged. This demonstrates:',
    options: [
      'Logical data independence',
      'Physical data independence',
      'Logical dependency',
      'Referential integrity',
    ],
    correctAnswer: 'B',
    explanation:
      'Storage structure changes (heap → B+ tree) are internal-level changes. If applications continue to work unchanged, physical data independence is demonstrated.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q22',
    question:
      'A database administrator adds an index to improve query performance. Which schema is primarily affected?',
    options: ['External', 'Conceptual', 'Internal', 'External and conceptual only'],
    correctAnswer: 'C',
    explanation:
      'Indexes are a physical storage mechanism; adding one primarily affects the internal/physical schema.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q23',
    question:
      'A new attribute Email is added to the STUDENT relation, but existing user views do not use it. This can demonstrate:',
    options: [
      'Physical data independence',
      'Logical data independence',
      'No data independence',
      'Transaction independence',
    ],
    correctAnswer: 'B',
    explanation:
      'When a conceptual schema change (adding Email) does not force changes on existing external views, logical data independence is demonstrated.',
    difficulty: 'medium',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q24',
    question:
      'A table column Course is renamed to Program, while an existing user view continues to display Course. What allows this?',
    options: [
      'Physical mapping',
      'External-conceptual mapping',
      'Conceptual-internal mapping only',
      'Transaction management',
    ],
    correctAnswer: 'B',
    explanation:
      'The external-conceptual mapping allows the DBMS to translate the old view name (Course) to the new logical name (Program) transparently.',
    difficulty: 'medium',
    topic: 'Schema Mappings',
  },
  {
    id: 'q25',
    question:
      'Which change would normally NOT require changes to application programs if physical data independence is maintained?',
    options: [
      'Changing a file organization',
      'Removing a required logical attribute',
      'Changing the logical relationship between tables',
      "Changing a user's view",
    ],
    correctAnswer: 'A',
    explanation:
      'Physical changes (e.g., file organization) are insulated from application programs through physical data independence.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q26',
    question: 'Which change would normally be associated with logical data independence?',
    options: [
      'Changing disk storage',
      'Adding an index',
      'Changing the conceptual schema while preserving external views',
      'Changing page size',
    ],
    correctAnswer: 'C',
    explanation:
      'Logical data independence specifically refers to changes at the conceptual (logical) level that do not break existing external views.',
    difficulty: 'medium',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q27',
    question: 'Which of the following is an example of a physical schema change?',
    options: [
      'Add Phone to STUDENT',
      'Rename STUDENT to LEARNER',
      'Change heap storage to hash organization',
      'Add a new user view',
    ],
    correctAnswer: 'C',
    explanation:
      'Changing heap storage to hash organization is a physical storage restructuring — it affects only the internal schema.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q28',
    question: 'Which is an example of a logical schema change?',
    options: [
      'Change disk block size',
      'Create a B+ tree index',
      'Add a new attribute to a relation',
      'Move database files to another disk',
    ],
    correctAnswer: 'C',
    explanation:
      'Adding a new attribute modifies the conceptual/logical schema definition of the relation.',
    difficulty: 'medium',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q29',
    question: 'Why is physical data independence generally easier to achieve?',
    options: [
      'Physical changes usually do not alter the logical meaning of data',
      'Physical changes always require application modifications',
      'Logical schemas are stored directly on disk',
      'External views are unnecessary',
    ],
    correctAnswer: 'A',
    explanation:
      'Physical changes affect only storage details; since they don\'t alter what data means or how it is logically organized, the higher layers can remain unchanged.',
    difficulty: 'medium',
    topic: 'Data Independence',
  },
  {
    id: 'q30',
    question: 'Which of the following is the correct direction of abstraction?',
    options: [
      'Internal → Conceptual → External',
      'External → Internal → Conceptual',
      'Conceptual → External → Internal',
      'External → Conceptual → Internal',
    ],
    correctAnswer: 'D',
    explanation:
      'Abstraction increases from Internal (physical) through Conceptual (logical) to External (user view) — meaning a query travels External → Conceptual → Internal.',
    difficulty: 'medium',
    topic: 'Three-Schema Architecture',
  },
  {
    id: 'q31',
    question:
      'An application accesses a view rather than directly accessing physical storage. Which principle does this support?',
    options: [
      'Data independence',
      'Data duplication',
      'Data inconsistency',
      'Data fragmentation',
    ],
    correctAnswer: 'A',
    explanation:
      'Views provide a layer of abstraction — changes to physical storage are hidden from the application, supporting data independence.',
    difficulty: 'medium',
    topic: 'Data Independence',
  },
  {
    id: 'q32',
    question:
      'A DBA changes the indexing technique from a primary index to a B+ tree index. Which level is primarily changed?',
    options: ['External', 'Conceptual', 'Internal', 'User'],
    correctAnswer: 'C',
    explanation:
      'Indexing techniques are physical implementation details residing at the internal level.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q33',
    question:
      'A DBA changes the storage method from sequential file organization to hash file organization. Assuming the logical schema remains unchanged, what is demonstrated?',
    options: [
      'Logical data independence',
      'Physical data independence',
      'Referential integrity',
      'Normalization',
    ],
    correctAnswer: 'B',
    explanation:
      'Sequential → hash is a purely physical storage change. If the logical schema stays intact, physical data independence is in play.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q34',
    question:
      'A DBA changes the conceptual schema by adding Department, but existing applications continue to work because they do not use the new attribute. This is an example of:',
    options: [
      'Physical independence',
      'Logical independence',
      'No independence',
      'Transaction isolation',
    ],
    correctAnswer: 'B',
    explanation:
      'Applications continuing to work despite a conceptual schema change (adding Department) is a textbook example of logical data independence.',
    difficulty: 'medium',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q35',
    question: 'Which component hides physical storage details from the conceptual schema?',
    options: [
      'Conceptual-internal mapping',
      'External-conceptual mapping',
      'SQL parser',
      'Query optimizer only',
    ],
    correctAnswer: 'A',
    explanation:
      'The conceptual-internal mapping is responsible for translating conceptual-level operations to physical storage operations, hiding physical details from the conceptual schema.',
    difficulty: 'medium',
    topic: 'Schema Mappings',
  },
  {
    id: 'q36',
    question:
      'Which component hides conceptual database changes from external users when possible?',
    options: [
      'External-conceptual mapping',
      'Conceptual-internal mapping',
      'Storage manager',
      'Buffer manager',
    ],
    correctAnswer: 'A',
    explanation:
      'The external-conceptual mapping translates user view requests into conceptual terms, allowing the DBMS to absorb conceptual changes without exposing them to users.',
    difficulty: 'medium',
    topic: 'Schema Mappings',
  },
  {
    id: 'q37',
    question:
      'Suppose a database uses: External View → STUDENT → B+ Tree. If STUDENT remains unchanged but B+ Tree is replaced by Hash storage, which levels remain unchanged?',
    options: ['Only External', 'Only Conceptual', 'External and Conceptual', 'None'],
    correctAnswer: 'C',
    explanation:
      'Only the internal (physical) schema changes. Both the external view and the conceptual STUDENT table remain unchanged — demonstrating physical data independence.',
    difficulty: 'medium',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q38',
    question:
      'Suppose a new logical attribute is added but is not included in any existing external view. Which level changes?',
    options: [
      'Only external',
      'Only conceptual',
      'Conceptual and external necessarily',
      'Only internal',
    ],
    correctAnswer: 'B',
    explanation:
      'Adding a new attribute changes the conceptual schema. Since no existing view uses it, the external level need not change.',
    difficulty: 'medium',
    topic: 'Logical Data Independence',
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// HARD (Q39–Q50): Complex multi-step / analysis questions
// ──────────────────────────────────────────────────────────────────────────────
export const hardQuestions: QuizQuestion[] = [
  {
    id: 'q39',
    question:
      'Which scenario would most likely break logical data independence?',
    options: [
      'Changing an index',
      'Changing a file organization',
      'Removing an attribute that an existing external view depends upon',
      'Changing storage hardware',
    ],
    correctAnswer: 'C',
    explanation:
      'Removing a conceptual attribute that an external view uses forces the view (and applications) to be updated — this breaks logical data independence.',
    difficulty: 'hard',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q40',
    question: 'Which statement best describes the purpose of schema mappings?',
    options: [
      'They eliminate the need for databases',
      'They translate requests between different schema levels',
      'They encrypt all database records',
      'They remove database constraints',
    ],
    correctAnswer: 'B',
    explanation:
      'Schema mappings (external-conceptual and conceptual-internal) translate operations and data descriptions between schema levels, enabling data independence.',
    difficulty: 'hard',
    topic: 'Schema Mappings',
  },
  {
    id: 'q41',
    question:
      'Consider: External: StudentID, Name, GPA | Logical: StudentID, Name, GPA, Email | Physical: B+ Tree storage. If the physical organization changes from B+ Tree to Hash while the logical schema remains unchanged, which statement is correct?',
    options: [
      'External schema changes',
      'Logical schema changes',
      'Physical schema changes',
      'Application views must necessarily change',
    ],
    correctAnswer: 'C',
    explanation:
      'Only the internal/physical schema changes (B+ Tree → Hash). The logical schema and external views remain intact — physical data independence is maintained.',
    difficulty: 'hard',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q42',
    question:
      'An external view StudentView(StudentID, Name, GPA) exists. The conceptual schema changes from STUDENT(StudentID, Name, GPA) to STUDENT(StudentID, FirstName, LastName, GPA). The DBMS maintains the old view by constructing Name from FirstName and LastName. What does this demonstrate?',
    options: [
      'Physical data independence',
      'Logical data independence',
      'Physical storage optimization',
      'Transaction isolation',
    ],
    correctAnswer: 'B',
    explanation:
      'The external view continues to work despite a conceptual schema structural change (splitting Name into FirstName + LastName). This is logical data independence via a view mapping.',
    difficulty: 'hard',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q43',
    question:
      'A database changes its physical storage from Heap → Sequential → B+ Tree while applications continue using the same relations and views. How many schema levels are directly affected by these storage changes?',
    options: ['One', 'Two', 'Three', 'None'],
    correctAnswer: 'A',
    explanation:
      'Only the internal level is directly affected. The conceptual and external levels remain unchanged — a demonstration of physical data independence.',
    difficulty: 'hard',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q44',
    question:
      'External View: StudentID, Name, GPA. Logical Table: StudentID, Name, GPA, Email. If Email is removed from the logical table, what happens to the existing external view?',
    options: [
      'It is necessarily affected',
      'It is unaffected because it never used Email',
      'The physical schema must change',
      'All database applications must stop',
    ],
    correctAnswer: 'B',
    explanation:
      'The external view only uses StudentID, Name, GPA — none of which are removed. Therefore it is not affected by the removal of Email from the logical schema.',
    difficulty: 'hard',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q45',
    question:
      'External View: StudentID, Name, GPA. Logical Table: StudentID, Name, GPA. If GPA is removed from the logical schema, what is the likely consequence?',
    options: [
      'The external view can remain unchanged automatically',
      'The external view is affected because it depends on GPA',
      'Only the physical schema changes',
      'No schema changes occur',
    ],
    correctAnswer: 'B',
    explanation:
      'The external view depends on GPA. When GPA is removed from the conceptual schema, the external-conceptual mapping can no longer satisfy the view request — logical independence is broken.',
    difficulty: 'hard',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q46',
    question: 'Which situation represents the strongest example of physical data independence?',
    options: [
      'Adding a new attribute to a relation',
      'Splitting one relation into two relations',
      'Changing heap storage to a B+ tree without changing applications',
      "Changing a user's view",
    ],
    correctAnswer: 'C',
    explanation:
      'Changing the physical storage method (heap → B+ tree) while keeping applications unchanged is the canonical example of physical data independence.',
    difficulty: 'hard',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q47',
    question: 'Which situation represents the strongest example of logical data independence?',
    options: [
      'Changing disk blocks',
      'Adding an index',
      'Changing the conceptual representation while preserving existing external views',
      'Changing the storage device',
    ],
    correctAnswer: 'C',
    explanation:
      'Restructuring the conceptual schema (e.g., splitting or renaming relations) while keeping all existing external views operational is the canonical example of logical data independence.',
    difficulty: 'hard',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q48',
    question:
      'Consider the chain: External → Conceptual → Internal. A change occurs at the Internal level. Assuming proper data independence, which levels should remain unaffected?',
    options: ['Only External', 'Only Conceptual', 'External and Conceptual', 'None'],
    correctAnswer: 'C',
    explanation:
      'Physical data independence means changes at the internal level should not propagate to the conceptual or external levels.',
    difficulty: 'hard',
    topic: 'Physical Data Independence',
  },
  {
    id: 'q49',
    question:
      'STUDENT(StudentID, Name, Course, GPA) becomes STUDENT(StudentID, Name, Program, GPA) where Course is renamed to Program. An existing external view still requests Course. The DBMS maintains a mapping between the old external name and the new logical attribute. Which concept is demonstrated?',
    options: [
      'Physical data independence',
      'Logical data independence',
      'Physical indexing',
      'Transaction atomicity',
    ],
    correctAnswer: 'B',
    explanation:
      'The external view requests Course, but the logical schema now uses Program. The external-conceptual mapping absorbs this rename, demonstrating logical data independence.',
    difficulty: 'hard',
    topic: 'Logical Data Independence',
  },
  {
    id: 'q50',
    question:
      'A DBMS has the architecture: External Schema → External–Conceptual Mapping → Conceptual Schema → Conceptual–Internal Mapping → Internal Schema. The DBA changes the internal schema from a heap file to a hash file. Which is the most accurate result?',
    options: [
      'The external schema must change',
      'The conceptual schema must change',
      'The internal schema changes while higher schema levels can remain unchanged',
      'All application programs must be rewritten',
    ],
    correctAnswer: 'C',
    explanation:
      'The conceptual-internal mapping absorbs the heap → hash change. The conceptual and external schemas can remain intact — this is physical data independence.',
    difficulty: 'hard',
    topic: 'Physical Data Independence',
  },
]

export const allQuizQuestions: QuizQuestion[] = [
  ...easyQuestions,
  ...mediumQuestions,
  ...hardQuestions,
]

export function getQuestionsByDifficulty(difficulty: Difficulty): QuizQuestion[] {
  switch (difficulty) {
    case 'easy':
      return easyQuestions
    case 'medium':
      return mediumQuestions
    case 'hard':
      return hardQuestions
  }
}
