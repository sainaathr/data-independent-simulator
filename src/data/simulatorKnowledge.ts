import type { StorageMethod, IndexType } from '../types/simulation'

export interface StorageMethodDetail {
  id: StorageMethod
  name: string
  category: 'File Layout' | 'Tree Structure' | 'Direct Access' | 'Columnar/Analytical' | 'Log-Structured'
  description: string
  howItWorks: string
  example: string
  advantages: string[]
  limitations: string[]
  useCase: string
}

export interface IndexStructureDetail {
  id: IndexType
  name: string
  category: 'Tree-Based' | 'Hashing' | 'Bit-Level' | 'Density' | 'Ordering' | 'Composite'
  description: string
  structure: string
  workingPrinciple: string
  example: string
  advantages: string[]
  limitations: string[]
  useCase: string
}

export type DbmsOperationType =
  | 'SELECT'
  | 'INSERT'
  | 'UPDATE'
  | 'DELETE'
  | 'CREATE'
  | 'ALTER'
  | 'DROP'
  | 'JOIN'
  | 'WHERE'
  | 'GROUP BY'
  | 'ORDER BY'
  | 'CREATE_INDEX'

export interface DbmsOperationDetail {
  id: DbmsOperationType
  label: string
  category: 'DQL' | 'DML' | 'DDL' | 'Relational Operator'
  syntaxExample: string
  description: string
  processingFlow: string[]
  externalImpact: 'Insulated (Transparent)' | 'View Defined' | 'Modified'
  logicalImpact: 'Relational Check' | 'Relation Schema Changed' | 'Tuple Modified'
  physicalImpact: 'Page Read / Buffer Scan' | 'Page Write / Allocation' | 'Access Path Built'
  dataIndependenceNote: string
}

export type ColumnDataType = 'INT' | 'VARCHAR' | 'CHAR' | 'DATE' | 'DECIMAL' | 'BOOLEAN'

export interface ColumnDefinition {
  name: string
  dataType: ColumnDataType
  label: string
  isPrimaryKey?: boolean
  isDefault?: boolean
  sampleValue: string
  description: string
}

// ─── 10 STORAGE METHODS ────────────────────────────────────────────────────────

export const STORAGE_METHODS_CATALOG: Record<StorageMethod, StorageMethodDetail> = {
  heap: {
    id: 'heap',
    name: 'Heap File Organization',
    category: 'File Layout',
    description: 'Unordered collection of records where records are placed in pages wherever free space exists.',
    howItWorks: 'New records are appended to the last page with available space. Record deletion leaves holes or prompts page compaction. Search requires scanning every page sequentially (O(N) cost).',
    example: 'Raw append-only event logs, staging tables for bulk load imports.',
    advantages: [
      'Very fast insertions (O(1)) with zero ordering overhead',
      'Minimal management overhead during initial table population',
      'Simple page allocation mechanism',
    ],
    limitations: [
      'Slow linear search times (full table scan required without index)',
      'Storage fragmentation over frequent deletes and updates',
      'High I/O cost for search and range queries',
    ],
    useCase: 'Bulk data loading, write-heavy audit logging, and temporary query scratchpads.',
  },
  sequential: {
    id: 'sequential',
    name: 'Sequential File Organization',
    category: 'File Layout',
    description: 'Records are stored physically sorted by a predetermined search key attribute.',
    howItWorks: 'Records are written in strict key order. Binary search locates pages rapidly (O(log2 N)). Insertions into middle positions utilize overflow blocks or require record shifting.',
    example: 'Payroll master files ordered by Employee_ID.',
    advantages: [
      'Extremely fast ordered sequential scans and range queries',
      'Binary search can locate target blocks on sorted disk files',
      'Optimal for batch sequential processing without auxiliary indexes',
    ],
    limitations: [
      'Expensive record insertion and deletion due to physical record shifts',
      'Overflow areas degrade search efficiency until file reorganization',
      'Only one physical sequential ordering is possible per table',
    ],
    useCase: 'Batch reporting systems, payroll processing, and sorted ledger archives.',
  },
  btree: {
    id: 'btree',
    name: 'B+ Tree-based Organization',
    category: 'Tree Structure',
    description: 'Self-balancing dynamic multi-way search tree where all data records reside in doubly linked leaf nodes.',
    howItWorks: 'Internal nodes route search keys; leaf pages store tuples and maintain bidirectional pointers for sequential traversal. Page splits and merges maintain tree balance with O(log N) operations.',
    example: 'MySQL InnoDB clustered primary key index tables, SQLite B-Tree tables.',
    advantages: [
      'Consistent logarithmic O(log N) lookup, insertion, and deletion times',
      'Exceptional support for both point lookups and range scans',
      'Self-balancing with no degradation over continuous CRUD operations',
    ],
    limitations: [
      'Storage overhead for internal routing nodes and pointers',
      'Page split overhead on random non-sequential inserts',
      'Locking during page rebalancing in concurrent environments',
    ],
    useCase: 'Primary relational storage for general OLTP systems with mixed point queries and range filters.',
  },
  hash: {
    id: 'hash',
    name: 'Hash-based Storage',
    category: 'Direct Access',
    description: 'Uses a mathematical hash function to compute physical bucket page addresses directly from key values.',
    howItWorks: 'Hash(search_key) computes the target bucket address directly, achieving O(1) average access. Collisions are handled using bucket chaining or open addressing.',
    example: 'In-memory lookup caches, customer session state stores.',
    advantages: [
      'Near O(1) constant-time direct equality lookups',
      'Eliminates tree traversal depth overhead for point queries',
      'Fixed memory access footprint per search key',
    ],
    limitations: [
      'Cannot support range queries (<, >, BETWEEN) because hashing destroys ordering',
      'Hash bucket overflow chains degrade performance if hash distribution is poor',
      'Resizing hash tables (dynamic hashing) incurs reorganization cost',
    ],
    useCase: 'Exact-match key-value lookups, session tokens, user ID authentication tables.',
  },
  clustered: {
    id: 'clustered',
    name: 'Clustered Storage Organization',
    category: 'File Layout',
    description: 'Colocates related records from the same or multiple tables on the same physical pages.',
    howItWorks: 'Records sharing a common clustering key (e.g., Department and its Students) are physically interleaved onto the same disk block, eliminating random disk head movement during joins.',
    example: 'Department records interleaved with corresponding Student records in the same data block.',
    advantages: [
      'Eliminates random disk I/O when executing 1-to-N relational JOINs',
      'Prefetches related child entities in a single physical block read',
      'Greatly reduces buffer pool cache thrashing during relational queries',
    ],
    limitations: [
      'Slows down single-table full scans that must skip interleaved foreign rows',
      'Complex tuple migration when clustering key values change',
      'Substantial insertion overhead when cluster blocks become full',
    ],
    useCase: 'High-frequency relational parent-child queries and entity aggregation workloads.',
  },
  columnar: {
    id: 'columnar',
    name: 'Column-Oriented Storage (Column Store)',
    category: 'Columnar/Analytical',
    description: 'Stores data physically on disk by columns rather than by rows.',
    howItWorks: 'All values for attribute "GPA" are stored sequentially, followed by values for "Department". Enables columnar compression (Run-Length, Dictionary) and vectorized SIMD processing.',
    example: 'Data warehousing engines such as Snowflake, Google BigQuery, ClickHouse, Apache Parquet.',
    advantages: [
      'Massive compression ratios due to homogeneous data type proximity',
      'Reads only columns specified in SELECT queries, skipping unused attributes',
      'Unrivaled performance for aggregation queries (SUM, AVG, MIN, MAX)',
    ],
    limitations: [
      'Slow single-row INSERT, UPDATE, and DELETE operations',
      'High tuple reconstruction cost when retrieving entire multi-attribute rows',
      'Not suitable for high-concurrency transactional OLTP',
    ],
    useCase: 'OLAP data warehouses, business intelligence dashboards, academic analytics.',
  },
  isa: {
    id: 'isa',
    name: 'Indexed Sequential Access (ISAM)',
    category: 'File Layout',
    description: 'Static multi-level hierarchical index (cylinder, track, surface) over sequentially ordered records.',
    howItWorks: 'Pre-computed static index trees navigate directly to primary disk tracks. When pages fill up, overflow chains are appended without altering the primary index structure.',
    example: 'Legacy mainframe database systems, read-intensive static lookup tables.',
    advantages: [
      'Index never changes during reads, avoiding index locking overhead',
      'Simultaneous support for fast random direct access and sequential scans',
      'Predictable I/O access paths on magnetic storage media',
    ],
    limitations: [
      'Overflow chains degrade lookup performance as data grows',
      'Requires periodic offline table rebuilding to re-establish primary index order',
      'Static structure cannot adapt dynamically to unpredictable write patterns',
    ],
    useCase: 'Read-mostly reference dictionaries, legacy banking catalogs with scheduled batch reorganization.',
  },
  lsm: {
    id: 'lsm',
    name: 'Log-Structured Merge Tree (LSM-Tree)',
    category: 'Log-Structured',
    description: 'Append-only write architecture buffering writes in memory (MemTable) and flushing immutable sorted string tables (SSTables) to disk.',
    howItWorks: 'Writes are written sequentially to a Write-Ahead Log (WAL) and stored in RAM. Background compaction periodically merges sorted disk SSTables and discards overwritten versions.',
    example: 'NoSQL engines like Apache Cassandra, RocksDB, Google LevelDB, TiKV.',
    advantages: [
      'Blazing fast write throughput by converting random writes to sequential I/O',
      'Exceptional storage density and flash memory (SSD/NVMe) longevity',
      'Eliminates in-place disk page overwrite bottlenecks',
    ],
    limitations: [
      'Read amplification: point lookups must check memory and multiple disk SSTables',
      'Background compaction consumes substantial disk I/O bandwidth',
      'Requires Bloom filters to prevent searching missing keys across all SSTables',
    ],
    useCase: 'High-velocity telemetry streams, IoT sensor recording, activity logs, write-heavy key-value stores.',
  },
  partitioned: {
    id: 'partitioned',
    name: 'Partitioned Storage (Horizontal)',
    category: 'File Layout',
    description: 'Splits a large table into smaller, independent physical partitions based on partition key criteria.',
    howItWorks: 'Rules (Range, List, Hash) assign rows to physical partition files. The query optimizer applies "partition pruning" to scan only partitions matching WHERE criteria, ignoring the rest.',
    example: 'Student records partitioned by enrollment_date or department.',
    advantages: [
      'Dramatic reduction in scan times through partition pruning',
      'Independent maintenance: backup, index rebuild, or archival per partition',
      'Enables parallel disk I/O across partitions on multi-core systems',
    ],
    limitations: [
      'Queries without the partition key must scan all partitions (scatter-gather)',
      'Global primary keys and foreign key constraints incur coordination overhead',
      'Partition skew if hash or range distribution is uneven',
    ],
    useCase: 'Very Large Databases (VLDBs), historical time-series datasets, multi-tenant enterprise databases.',
  },
  row: {
    id: 'row',
    name: 'Row-Oriented Storage (Row Store)',
    category: 'File Layout',
    description: 'Traditional OLTP layout storing all column values of a single record consecutively in a page slot.',
    howItWorks: 'Page layout consists of page header, line pointer array, and contiguous tuple data: [ID, Name, Course, GPA]. Entire row is fetched into memory in a single page read.',
    example: 'PostgreSQL Heap tables, SQLite tables, Oracle standard tables.',
    advantages: [
      'Optimal for fetching complete entity records (e.g., SELECT * FROM STUDENT)',
      'Fast insertion of entire new rows into available page slots',
      'High concurrency for transaction row-level locking',
    ],
    limitations: [
      'Reading a single attribute for aggregation requires reading entire rows from disk',
      'Lower compression ratio than columnar storage due to mixed attribute data types',
      'High I/O bandwidth waste for analytical reporting',
    ],
    useCase: 'Standard Online Transaction Processing (OLTP), student registration portals, transactional CRM.',
  },
}

// ─── 10 INDEX STRUCTURES ───────────────────────────────────────────────────────

export const INDEX_STRUCTURES_CATALOG: Record<IndexType, IndexStructureDetail> = {
  none: {
    id: 'none',
    name: 'No Index (Heap Scan)',
    category: 'Density',
    description: 'Data pages are accessed directly without auxiliary lookup structures.',
    structure: 'Zero secondary metadata files; queries perform full sequential table scans.',
    workingPrinciple: 'DBMS sequentially reads every disk block allocated to the relation from beginning to end, inspecting each tuple against the search condition.',
    example: 'SELECT * FROM STUDENT WHERE name = "Alice" without an index on name.',
    advantages: [
      'Zero storage overhead for index trees or hash tables',
      'Zero maintenance overhead on INSERT, UPDATE, or DELETE operations',
      'Simple execution plan with no index overhead for tiny tables (under 10 pages)',
    ],
    limitations: [
      'Linear O(N) search cost; scales poorly as table grows to thousands or millions of records',
      'High disk I/O and buffer cache consumption',
      'Slow execution for join matching and sorting',
    ],
    useCase: 'Small lookup tables with fewer than a few hundred rows, staging bulk load tables.',
  },
  btree: {
    id: 'btree',
    name: 'B+ Tree Index',
    category: 'Tree-Based',
    description: 'Self-balancing multi-level search tree with keys in internal nodes and record pointers in linked leaf nodes.',
    structure: 'Root node -> Intermediate routing nodes -> Doubly-linked leaf page array.',
    workingPrinciple: 'Keys navigate search from root to leaf in O(log N) operations. Doubly-linked leaves allow efficient forward and backward range scans without returning to root.',
    example: 'CREATE INDEX idx_student_gpa ON STUDENT(gpa);',
    advantages: [
      'Balanced search depth guarantees uniform O(log N) lookup time',
      'Optimal for equality (=), range queries (<, >, BETWEEN), and prefix LIKE searches',
      'Keeps leaf blocks sorted, satisfying ORDER BY clauses without explicit sorting',
    ],
    limitations: [
      'Page split overhead when inserting keys in non-sequential order',
      'Index blocks consume extra disk and buffer pool RAM',
      'Must be updated on every row insertion, deletion, and indexed column update',
    ],
    useCase: 'Primary keys, foreign keys, numeric ranges (GPA, Semester), and general query filters.',
  },
  hash: {
    id: 'hash',
    name: 'Hash Index',
    category: 'Hashing',
    description: 'Index using a hash function to map search keys to bucket addresses containing record pointers.',
    structure: 'Array of bucket pointers pointing to page addresses with collision chains.',
    workingPrinciple: 'Hash(search_key) produces an integer bucket index directly in O(1) time. Record pointers in the bucket identify physical tuple locations.',
    example: 'CREATE INDEX idx_student_email_hash ON STUDENT USING HASH (email);',
    advantages: [
      'O(1) constant-time point lookup performance',
      'Faster than B+ Tree for exact equality matching',
      'Compact bucket structure for high-density unique keys',
    ],
    limitations: [
      'Useless for range queries (<, >, BETWEEN) because hash values do not preserve order',
      'Hash collisions create overflow chains that degrade performance',
      'Cannot support partial key matching or pattern matching (LIKE)',
    ],
    useCase: 'Exact-match lookups on unique emails, national IDs, UUIDs, or session tokens.',
  },
  bitmap: {
    id: 'bitmap',
    name: 'Bitmap Index',
    category: 'Bit-Level',
    description: 'Uses bit arrays where each distinct attribute value has a bitmap with one bit per row in the table.',
    structure: 'Value mapping table: Distinct Value -> 64-bit/word aligned Bit Array representing row IDs.',
    workingPrinciple: 'Bit is set to 1 if the row possesses the value, 0 otherwise. Multiple filter predicates (Gender = "F" AND Fees_Status = "Paid") are evaluated via bitwise AND operations directly in CPU registers.',
    example: 'Bitmap index on low-cardinality attributes: gender, fees_status, department.',
    advantages: [
      'Tiny storage space for low-cardinality attributes',
      'Ultra-fast multi-condition query evaluation using hardware bitwise logic',
      'Efficient row count aggregations without accessing underlying data pages',
    ],
    limitations: [
      'High lock contention during concurrent INSERT/UPDATE (locks entire bit vectors)',
      'Unsuitable for high-cardinality attributes (e.g., student_id, phone)',
      'Expensive to maintain in OLTP write-heavy applications',
    ],
    useCase: 'Data warehousing, reporting portals, filtering on gender, semester, status flags.',
  },
  dense: {
    id: 'dense',
    name: 'Dense Index',
    category: 'Density',
    description: 'An index that contains an entry for every single search key value in the data file.',
    structure: 'Index record for every row: [Search_Key, Record_Pointer].',
    workingPrinciple: 'Every key in the table has a direct entry in the index file. Can answer index-only queries without touching the main data pages.',
    example: 'Dense secondary index on student email addresses.',
    advantages: [
      'Can locate any record directly without secondary in-block sequential scans',
      'Supports index-only scans (covering queries) directly from the index',
      'Fast existence checks (EXISTS, COUNT) without reading data file',
    ],
    limitations: [
      'Large index file size that may exceed available buffer cache RAM',
      'High maintenance overhead on every insert and delete operation',
      'Higher storage footprint than sparse indexing',
    ],
    useCase: 'Secondary indexes, candidate keys, and covering index queries.',
  },
  sparse: {
    id: 'sparse',
    name: 'Sparse Index',
    category: 'Density',
    description: 'An index that contains an entry only for the first record of each data block (block anchor).',
    structure: 'One index record per physical data block: [First_Key_In_Block, Block_Pointer].',
    workingPrinciple: 'Finds the index entry with the largest key less than or equal to search key. Loads that single block into memory and searches sequentially within the block.',
    example: 'Sparse index on sequentially ordered STUDENT table by student_id.',
    advantages: [
      'Very compact index size; easily fits entirely in RAM buffer pool',
      'Low maintenance overhead during insertions within existing blocks',
      'Minimal index I/O footprint during traversals',
    ],
    limitations: [
      'Requires the data file to be physically sorted on the search key',
      'Requires an in-memory linear scan of the target block after loading',
      'Cannot be used as a secondary index for unordered files',
    ],
    useCase: 'Primary indexes on sorted physical tables, clustered file architectures.',
  },
  primary: {
    id: 'primary',
    name: 'Primary Index',
    category: 'Ordering',
    description: 'Index specified on the ordering primary key of a physically sorted file.',
    structure: 'Usually a sparse index referencing block anchors of the primary sorted key.',
    workingPrinciple: 'Guarantees entity uniqueness while indexing the physical sorted sequence of the data file.',
    example: 'Primary index on student_id in table STUDENT.',
    advantages: [
      'Guarantees primary key uniqueness and integrity enforcement',
      'Extremely compact if implemented as sparse index over sorted blocks',
      'Fastest navigation path for entity lookups by primary key',
    ],
    limitations: [
      'Only one primary index is possible per relation because data has only one physical order',
      'Key updates require moving records physically',
      'Must maintain primary key constraint invariants on every insert',
    ],
    useCase: 'Primary key access, entity retrieval by unique identifier.',
  },
  secondary: {
    id: 'secondary',
    name: 'Secondary Index',
    category: 'Ordering',
    description: 'Index built on an attribute that does not dictate the physical order of the data file.',
    structure: 'Always dense: every row has an index entry pointing to its physical address (RID).',
    workingPrinciple: 'Allows searching on non-ordering attributes (e.g., student name or phone) without scanning the entire table.',
    example: 'CREATE INDEX idx_student_name ON STUDENT(name);',
    advantages: [
      'Accelerates queries filtering on non-primary key attributes',
      'A table can have multiple secondary indexes simultaneously',
      'Enables flexible multi-attribute query patterns',
    ],
    limitations: [
      'Must be dense, consuming significant disk and memory space',
      'Traversing secondary index pointers causes random (non-sequential) I/O on disk',
      'Every secondary index adds write overhead during INSERT, UPDATE, and DELETE',
    ],
    useCase: 'Frequently queried search attributes (Name, Department, Email, Course).',
  },
  clustered: {
    id: 'clustered',
    name: 'Clustered Index',
    category: 'Ordering',
    description: 'Index where the physical ordering of table rows matches the index ordering; leaf nodes contain the actual data rows.',
    structure: 'B+ Tree where leaf nodes ARE the physical data pages storing complete tuples.',
    workingPrinciple: 'Finding the leaf node in the index immediately yields the complete data row with no extra pointer dereferencing step.',
    example: 'Clustered index on STUDENT(student_id) in SQL Server or MySQL InnoDB.',
    advantages: [
      'Fastest possible data access: eliminates the secondary lookup step to read data page',
      'Unsurpassed performance for range scans and ORDER BY queries on the clustered key',
      'Zero pointer overhead between leaf index and data tuple',
    ],
    limitations: [
      'Only one clustered index per table is physically possible',
      'Inserting non-sequential keys causes leaf page splits and fragmentation',
      'Secondary indexes in clustered tables must store the clustered key instead of RIDs',
    ],
    useCase: 'Primary key of transactional tables, auto-incrementing IDs, primary timestamp columns.',
  },
  composite: {
    id: 'composite',
    name: 'Composite Index (Multi-Column Index)',
    category: 'Composite',
    description: 'Index constructed across two or more columns of a relation in a specified order.',
    structure: 'Composite B+ Tree with compound search keys: (Col1, Col2, Col3).',
    workingPrinciple: 'Keys are ordered lexicographically: sorted first by Col1, then by Col2 within Col1 matches. Efficient when query filters on leftmost column prefix.',
    example: 'CREATE INDEX idx_dept_sem_gpa ON STUDENT(department, semester, gpa);',
    advantages: [
      'Accelerates multi-predicate queries (WHERE dept="CS" AND semester=4)',
      'Acts as a covering index for queries projecting only indexed composite columns',
      'Eliminates index-merge operations by combining multiple attributes in a single tree',
    ],
    limitations: [
      'Leftmost Prefix Rule: useless for queries that filter on Col2 without filtering on Col1',
      'Larger key size decreases index fan-out and increases tree depth',
      'Higher write maintenance overhead when any of the composite columns are updated',
    ],
    useCase: 'Common multi-filter combinations: Department + Semester, Course + GPA.',
  },
}

// ─── 12 DBMS OPERATIONS ────────────────────────────────────────────────────────

export const DBMS_OPERATIONS_CATALOG: DbmsOperationDetail[] = [
  {
    id: 'SELECT',
    label: 'SELECT (Query / Projection)',
    category: 'DQL',
    syntaxExample: 'SELECT student_id, name, course, gpa FROM STUDENT WHERE gpa > 3.5;',
    description: 'Retrieves data from one or more relations according to projection attributes and selection criteria.',
    processingFlow: [
      '1. User submits SQL query through external interface / view',
      '2. DBMS Query Parser verifies conceptual schema catalog definitions',
      '3. External-to-Conceptual mapping confirms projected attributes exist',
      '4. Query Optimizer consults Conceptual-to-Internal mapping for available index access paths',
      '5. Storage Engine reads matching disk pages into Buffer Pool and returns tuples',
    ],
    externalImpact: 'View Defined',
    logicalImpact: 'Relational Check',
    physicalImpact: 'Page Read / Buffer Scan',
    dataIndependenceNote: 'Physical data independence ensures that adding or changing indexes (Heap vs B+ Tree) accelerates SELECT without modifying application query syntax.',
  },
  {
    id: 'INSERT',
    label: 'INSERT (Tuple Insertion)',
    category: 'DML',
    syntaxExample: 'INSERT INTO STUDENT (student_id, name, course, gpa) VALUES (105, "Elena", "CS", 3.9);',
    description: 'Appends a new record tuple into the target relational table.',
    processingFlow: [
      '1. External client provides attribute values for tuple',
      '2. Conceptual level checks integrity constraints (Primary Key, NOT NULL, Data Types)',
      '3. Storage Engine selects target page based on physical layout (Heap slot vs B+ Tree leaf)',
      '4. Physical page written; write-ahead log (WAL) recorded',
      '5. All active secondary index structures are updated with new key pointers',
    ],
    externalImpact: 'Insulated (Transparent)',
    logicalImpact: 'Tuple Modified',
    physicalImpact: 'Page Write / Allocation',
    dataIndependenceNote: 'Underlying physical page splits or LSM memtable flushes occur transparently without affecting logical constraints or application view definitions.',
  },
  {
    id: 'UPDATE',
    label: 'UPDATE (Record Modification)',
    category: 'DML',
    syntaxExample: 'UPDATE STUDENT SET gpa = 3.95 WHERE student_id = 101;',
    description: 'Modifies existing attribute values in tuples matching selection predicates.',
    processingFlow: [
      '1. Target records identified using index scan or table scan',
      '2. Conceptual level validates integrity and data type constraints',
      '3. In-place page update executed or out-of-place MVCC version generated',
      '4. If updated column is indexed, corresponding index structures are updated',
    ],
    externalImpact: 'Insulated (Transparent)',
    logicalImpact: 'Tuple Modified',
    physicalImpact: 'Page Write / Allocation',
    dataIndependenceNote: 'Whether updated in-place or via LSM out-of-place append, the external view continues to see updated logical values without schema perturbation.',
  },
  {
    id: 'DELETE',
    label: 'DELETE (Record Removal)',
    category: 'DML',
    syntaxExample: 'DELETE FROM STUDENT WHERE student_id = 104;',
    description: 'Removes tuples matching filter conditions from the relational table.',
    processingFlow: [
      '1. Target tuples located via physical access path',
      '2. Foreign key referential integrity constraints checked at conceptual level',
      '3. Record slot marked as deleted (tombstone) or page compacted',
      '4. Index entries purged or marked dead',
    ],
    externalImpact: 'Insulated (Transparent)',
    logicalImpact: 'Tuple Modified',
    physicalImpact: 'Page Write / Allocation',
    dataIndependenceNote: 'Physical space reclamation (vacuuming / compaction) operates entirely at internal level without impacting external application queries.',
  },
  {
    id: 'CREATE',
    label: 'CREATE TABLE (Schema Creation)',
    category: 'DDL',
    syntaxExample: 'CREATE TABLE STUDENT (student_id INT PRIMARY KEY, name VARCHAR, gpa DECIMAL);',
    description: 'Defines a new conceptual relation in the data dictionary catalog.',
    processingFlow: [
      '1. DBMS parses table definition and column constraints',
      '2. System catalog tables (metadata dictionary) updated with relation schema',
      '3. Internal storage engine allocates initial page extents and files on storage device',
      '4. Default primary key clustered index initialized',
    ],
    externalImpact: 'Insulated (Transparent)',
    logicalImpact: 'Relation Schema Changed',
    physicalImpact: 'Page Write / Allocation',
    dataIndependenceNote: 'Adding a new table to the conceptual schema demonstrates Logical Data Independence: existing external views and queries on other tables remain 100% unaffected.',
  },
  {
    id: 'ALTER',
    label: 'ALTER TABLE (Schema Evolution)',
    category: 'DDL',
    syntaxExample: 'ALTER TABLE STUDENT ADD COLUMN email VARCHAR;',
    description: 'Modifies conceptual relation structure by adding, removing, or renaming columns.',
    processingFlow: [
      '1. Catalog entry for relation updated with new/modified attribute descriptor',
      '2. External-to-Conceptual mappings evaluated to verify whether existing views are broken',
      '3. Storage engine updates tuple descriptor or executes physical column addition/null-byte expansion',
      '4. If projected view does not reference modified column, view requires zero changes',
    ],
    externalImpact: 'View Defined',
    logicalImpact: 'Relation Schema Changed',
    physicalImpact: 'Page Write / Allocation',
    dataIndependenceNote: 'Central demonstration of Logical Data Independence: adding an attribute expands the conceptual schema and physical tuple width while external user views remain perfectly stable.',
  },
  {
    id: 'DROP',
    label: 'DROP TABLE (Relation Deletion)',
    category: 'DDL',
    syntaxExample: 'DROP TABLE STUDENT;',
    description: 'Removes relation definition from system catalog and deallocates physical disk pages.',
    processingFlow: [
      '1. Catalog verifies dependent views and foreign key constraints',
      '2. Dependent external views marked invalid if they query the dropped table',
      '3. Catalog metadata entries removed from data dictionary',
      '4. Physical page extents freed and returned to OS / storage pool',
    ],
    externalImpact: 'Modified',
    logicalImpact: 'Relation Schema Changed',
    physicalImpact: 'Page Write / Allocation',
    dataIndependenceNote: 'Directly impacts external views that query the dropped relation, highlighting the boundary of logical data independence.',
  },
  {
    id: 'JOIN',
    label: 'JOIN (Relational Combination)',
    category: 'Relational Operator',
    syntaxExample: 'SELECT s.name, d.dept_name FROM STUDENT s JOIN DEPARTMENT d ON s.department = d.dept_id;',
    description: 'Combines records from two relations based on matching attribute values.',
    processingFlow: [
      '1. Query optimizer analyzes relational schemas of both participating tables',
      '2. Optimizer selects physical join strategy (Nested Loop, Hash Join, Sort-Merge Join)',
      '3. Execution engine reads pages and evaluates join predicate',
      '4. Result tuples projected to external client format',
    ],
    externalImpact: 'View Defined',
    logicalImpact: 'Relational Check',
    physicalImpact: 'Page Read / Buffer Scan',
    dataIndependenceNote: 'Physical data independence allows the DBMS to switch between Hash Join and Sort-Merge Join when physical index structures change, without altering SQL queries.',
  },
  {
    id: 'WHERE',
    label: 'WHERE (Selection Predicate)',
    category: 'Relational Operator',
    syntaxExample: 'SELECT * FROM STUDENT WHERE department = "CS" AND gpa >= 3.8;',
    description: 'Filters tuples based on Boolean search criteria.',
    processingFlow: [
      '1. Predicate pushed down to storage layer by query planner',
      '2. Access path chosen: index range scan or sequential heap scan',
      '3. Tuples evaluated against condition in buffer pool',
      '4. Qualifying records delivered to client',
    ],
    externalImpact: 'Insulated (Transparent)',
    logicalImpact: 'Relational Check',
    physicalImpact: 'Page Read / Buffer Scan',
    dataIndependenceNote: 'Creating a B+ Tree index on the filtered column transforms an O(N) heap scan into an O(log N) tree scan while the user SQL WHERE clause remains identical.',
  },
  {
    id: 'GROUP BY',
    label: 'GROUP BY (Aggregation Partitioning)',
    category: 'Relational Operator',
    syntaxExample: 'SELECT department, AVG(gpa) FROM STUDENT GROUP BY department;',
    description: 'Groups rows with matching values into summary rows with aggregate functions.',
    processingFlow: [
      '1. Aggregation operator initialized (Hash Aggregate or Stream Aggregate)',
      '2. Tuples processed into in-memory hash buckets or sorted stream',
      '3. Cumulative functions (COUNT, SUM, AVG) calculated per group',
      '4. Aggregated result returned to external perspective',
    ],
    externalImpact: 'View Defined',
    logicalImpact: 'Relational Check',
    physicalImpact: 'Page Read / Buffer Scan',
    dataIndependenceNote: 'Physical storage format (Row Store vs Column Store) dramatically changes aggregation I/O throughput without altering the logical GROUP BY query.',
  },
  {
    id: 'ORDER BY',
    label: 'ORDER BY (Sort Operator)',
    category: 'Relational Operator',
    syntaxExample: 'SELECT * FROM STUDENT ORDER BY gpa DESC;',
    description: 'Orders query output records based on specified attributes.',
    processingFlow: [
      '1. Optimizer checks if an existing B+ Tree index already provides the requested sort order',
      '2. If indexed: reads leaf nodes directly in sorted order (zero-cost sort)',
      '3. If unindexed: allocates memory buffer for external merge sort (quicksort / run generation)',
      '4. Formatted sorted stream returned to client',
    ],
    externalImpact: 'View Defined',
    logicalImpact: 'Relational Check',
    physicalImpact: 'Page Read / Buffer Scan',
    dataIndependenceNote: 'Adding a B+ Tree index on the sort key eliminates expensive disk merge sort operations, proving physical independence between storage access paths and query output.',
  },
  {
    id: 'CREATE_INDEX',
    label: 'CREATE INDEX (Access Path Creation)',
    category: 'DDL',
    syntaxExample: 'CREATE INDEX idx_student_dept ON STUDENT (department);',
    description: 'Constructs an auxiliary physical access path over an existing conceptual column.',
    processingFlow: [
      '1. Conceptual catalog registers new index descriptor',
      '2. Storage engine scans existing table records to extract key and pointer pairs',
      '3. Index structure (B+ Tree, Hash table, or Bitmap) built and written to disk pages',
      '4. Conceptual-to-Internal mapping updated to make index available to query optimizer',
    ],
    externalImpact: 'Insulated (Transparent)',
    logicalImpact: 'Relational Check',
    physicalImpact: 'Access Path Built',
    dataIndependenceNote: 'The textbook definition of Physical Data Independence: creating or dropping an index changes only the physical access path; external views and SQL queries require zero code changes.',
  },
]

// ─── 15 REALISTIC STUDENT COLUMNS ──────────────────────────────────────────────

export const REALISTIC_STUDENT_COLUMNS: ColumnDefinition[] = [
  {
    name: 'student_id',
    dataType: 'INT',
    label: 'Student ID',
    isPrimaryKey: true,
    isDefault: true,
    sampleValue: '1001',
    description: 'Unique integer identifier assigned to each student upon matriculation.',
  },
  {
    name: 'name',
    dataType: 'VARCHAR',
    label: 'Student Name',
    isDefault: true,
    sampleValue: 'Alice Johnson',
    description: 'Full legal name of the student.',
  },
  {
    name: 'age',
    dataType: 'INT',
    label: 'Age',
    sampleValue: '20',
    description: 'Current student chronological age in completed years.',
  },
  {
    name: 'gender',
    dataType: 'CHAR',
    label: 'Gender',
    sampleValue: 'F',
    description: 'Categorical gender indicator (M / F / O).',
  },
  {
    name: 'email',
    dataType: 'VARCHAR',
    label: 'Email Address',
    sampleValue: 'alice.j@university.edu',
    description: 'Institutional academic email address.',
  },
  {
    name: 'phone',
    dataType: 'VARCHAR',
    label: 'Phone Number',
    sampleValue: '+1-555-0192',
    description: 'Primary contact telephone number.',
  },
  {
    name: 'department',
    dataType: 'VARCHAR',
    label: 'Department',
    sampleValue: 'Computer Science',
    description: 'Academic department overseeing the student program.',
  },
  {
    name: 'course',
    dataType: 'VARCHAR',
    label: 'Enrolled Course / Degree',
    isDefault: true,
    sampleValue: 'B.Tech CSE',
    description: 'Academic degree program of enrollment.',
  },
  {
    name: 'semester',
    dataType: 'INT',
    label: 'Current Semester',
    sampleValue: '4',
    description: 'Current academic semester number (1 through 8).',
  },
  {
    name: 'gpa',
    dataType: 'DECIMAL',
    label: 'Cumulative GPA',
    isDefault: true,
    sampleValue: '3.85',
    description: 'Cumulative Grade Point Average on a 4.0 scale.',
  },
  {
    name: 'date_of_birth',
    dataType: 'DATE',
    label: 'Date of Birth',
    sampleValue: '2005-04-12',
    description: 'Student calendar birthdate (YYYY-MM-DD).',
  },
  {
    name: 'address',
    dataType: 'VARCHAR',
    label: 'Residential Address',
    sampleValue: '742 Evergreen Terrace',
    description: 'Street residential living address.',
  },
  {
    name: 'city',
    dataType: 'VARCHAR',
    label: 'City of Residence',
    sampleValue: 'Springfield',
    description: 'Municipality / city of current residence.',
  },
  {
    name: 'enrollment_date',
    dataType: 'DATE',
    label: 'Enrollment Date',
    sampleValue: '2023-08-15',
    description: 'Official date the student matriculated into the institution.',
  },
  {
    name: 'fees_status',
    dataType: 'BOOLEAN',
    label: 'Tuition Fees Paid Status',
    sampleValue: 'TRUE',
    description: 'Boolean flag indicating whether semester tuition is paid in full.',
  },
]
