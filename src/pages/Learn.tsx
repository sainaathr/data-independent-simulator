import React, { useState } from 'react'
import {
  BookOpen,
  Layers,
  HardDrive,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Video,
  Bookmark,
  Award,
  Zap,
  Cpu,
  Monitor,
  Table,
  Server,
  ArrowDown,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

interface VideoLecture {
  id: string
  title: string
  channel: string
  badge: string
  description: string
  youtubeId: string
  url: string
}

const EDUCATIONAL_VIDEOS: VideoLecture[] = [
  {
    id: 'nSAl7ngCyjw',
    youtubeId: 'nSAl7ngCyjw',
    title: 'Data Independence in DBMS & Three-Schema Architecture',
    channel: 'DBMS Academic Foundation',
    badge: 'Core Lecture',
    description: 'Foundational explanation of ANSI/SPARC 3-tier architecture, internal vs conceptual layers, and how data independence protects application code.',
    url: 'https://youtu.be/nSAl7ngCyjw?si=ZvPzCXt1dJLBI7oM'
  },
  {
    id: 'PBTi2HXwTsk',
    youtubeId: 'PBTi2HXwTsk',
    title: 'What is Data Independence? DBMS System Architecture',
    channel: 'System Architecture Series',
    badge: 'Architecture',
    description: 'In-depth breakdown of logical vs physical schema abstraction, schema separation rationale, and real-world system advantages.',
    url: 'https://youtu.be/PBTi2HXwTsk?si=BYBm3KIdC7gC-bDM'
  },
  {
    id: 'QK1l_wtBRIw',
    youtubeId: 'QK1l_wtBRIw',
    title: 'L12 : Data Independence and Its Types | Complete DBMS Course',
    channel: 'Riti Kumari • Complete DBMS Course',
    badge: 'Full Course',
    description: 'Systematic university course lecture explaining step-by-step physical data independence and logical data independence with schema examples.',
    url: 'https://youtu.be/QK1l_wtBRIw?si=8Yb1xbng14maIvpC'
  },
  {
    id: 'KQKHzsypxh4',
    youtubeId: 'KQKHzsypxh4',
    title: 'Data Independence (Physical & Logical) | Easy Explanation Using Animation',
    channel: 'Animated Computer Science',
    badge: 'Animated Guide',
    description: 'Visual animated breakdown illustrating why data independence is needed and how storage modifications do not affect user views.',
    url: 'https://youtu.be/KQKHzsypxh4?si=fS8PGYguUVQoxx2e'
  },
  {
    id: 'yctcmNdiQ-0',
    youtubeId: 'yctcmNdiQ-0',
    title: 'Logical Data Independence and Physical Data Independence | In Tamil',
    channel: 'Regional Educational Series',
    badge: 'Bilingual / Tamil',
    description: 'Clear bilingual regional lecture explaining the Three-Schema architecture, schema mappings, and independence mechanisms.',
    url: 'https://youtu.be/yctcmNdiQ-0?si=toks6sCTvYWmr-Ei'
  }
]

export const Learn: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'three-schema' | 'comparison' | 'applications' | 'video' | 'references'>('overview')
  const [selectedVideoId, setSelectedVideoId] = useState<string>('nSAl7ngCyjw')

  const currentVideo = EDUCATIONAL_VIDEOS.find(v => v.youtubeId === selectedVideoId) || EDUCATIONAL_VIDEOS[0]

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">
            Core Curriculum
          </Badge>
          <Badge variant="info" size="sm">
            ANSI / SPARC Standard
          </Badge>
          <Badge variant="success" size="sm">
            Comprehensive Module
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>Learn Concepts — Data Independence in DBMS</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
              Complete theoretical foundation of the Three-Schema Architecture, Physical and Logical Data Independence, architectural mappings, real-world case studies, and academic references.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Cpu className="w-4 h-4 fill-white" />}
            onClick={() => navigate('/simulator')}
          >
            Open Simulator
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar border-t border-slate-200 dark:border-slate-800">
          {[
            { id: 'overview', label: '1. What & Why', icon: Lightbulb },
            { id: 'three-schema', label: '2. Three-Schema Architecture', icon: Layers },
            { id: 'comparison', label: '3. Physical vs Logical', icon: GitBranch },
            { id: 'applications', label: '4. Applications & Trade-offs', icon: TrendingUp },
            { id: 'video', label: '5. Educational Video', icon: Video },
            { id: 'references', label: '6. References', icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── TAB 1: OVERVIEW & ANALOGY ────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Section 1: What is Data Independence? */}
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Lightbulb className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Concept 1</span>
              </div>
              <CardTitle className="text-xl mt-1">What is Data Independence?</CardTitle>
              <CardDescription>
                The fundamental architectural principle that insulates higher-level views and applications from underlying database changes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Data Independence</strong> is the ability to modify a schema definition at one level of a database system without necessitating modifications to the schema definition at the next higher level or rewriting application programs.
              </p>

              {/* Real World Analogy Box */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Real-World Intuitive Analogy: Driving an Automobile</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  When you drive a car, your interaction is through the steering wheel, accelerator pedal, and dashboard speed display (<strong>External View</strong>). If the manufacturer replaces a traditional gasoline engine with an electric motor or upgrades mechanical fuel injectors with computerized sensors (<strong>Physical / Internal change</strong>), you do not need to relearn how to turn the steering wheel or read the speedometer. The car’s driving interface remains invariant regardless of how the physical powertrain operates beneath the hood.
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  Similarly, a database user querying <code className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border font-mono">SELECT name, gpa FROM STUDENT</code> should not care whether the records are stored in a Heap file, a B+ Tree leaf, or a compressed columnar format on an NVMe SSD.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Why Data Independence is Needed */}
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Concept 2</span>
              </div>
              <CardTitle className="text-xl mt-1">Why Data Independence is Needed in DBMS</CardTitle>
              <CardDescription>
                Without data independence, any routine database optimization would break enterprise business software.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Reduced Maintenance Costs',
                  desc: 'Eliminates costly, error-prone application rewrites whenever the DBA reorganizes physical tables or creates performance indexes.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Seamless Scalability',
                  desc: 'Allows database administrators to add storage partitions, migrate to flash SSDs, or adjust page sizes as datasets grow to terabytes.',
                  icon: TrendingUp,
                },
                {
                  title: 'Schema Evolution',
                  desc: 'Supports adding new attributes or tables to satisfy emerging business requirements without disrupting legacy client applications.',
                  icon: GitBranch,
                },
                {
                  title: 'Security & Access Isolation',
                  desc: 'External views restrict sensitive attributes (e.g., student fees status, personal phone numbers) while exposing public fields.',
                  icon: Award,
                },
                {
                  title: 'Concurrent Multiple Views',
                  desc: 'Allows the Registrar, Academic Advisor, and Student to each view customized slices of the same unified relational data.',
                  icon: Layers,
                },
                {
                  title: 'Hardware & OS Portability',
                  desc: 'Decouples business logic from disk block sector geometries, operating system file systems, and hardware RAID controllers.',
                  icon: HardDrive,
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-indigo-700 dark:text-indigo-300">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── TAB 2: THREE-SCHEMA ARCHITECTURE ─────────────────────────────────── */}
      {activeTab === 'three-schema' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Layers className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">ANSI / SPARC Standard</span>
              </div>
              <CardTitle className="text-xl mt-1">The Three-Schema Database Architecture</CardTitle>
              <CardDescription>
                Proposed by the ANSI/X3/SPARC study group in 1975 to formally separate user applications from physical database representations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Architecture Visual */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto space-y-4">
                {/* Level 1: External */}
                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-sky-500" />
                      <span>Level 1: External Level (View Level)</span>
                    </span>
                    <Badge variant="info" size="sm">Tailored Perspectives</Badge>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Describes how individual user groups and external application portals perceive the database. A database can have multiple external schemas (views) concurrently, each projecting only relevant attributes.
                  </p>
                  <div className="text-[11px] font-mono bg-white dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800 text-sky-700 dark:text-sky-300">
                    Example: View `StudentPortal` exposes only (Student ID, Name, Course, GPA)
                  </div>
                </div>

                {/* Connector 1 */}
                <div className="flex items-center justify-center py-1">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    <ArrowDown className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
                    <span>External / Conceptual Mapping &bull; Logical Data Independence Barrier</span>
                  </div>
                </div>

                {/* Level 2: Conceptual */}
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-300 dark:border-indigo-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                      <Table className="w-4 h-4 text-indigo-600" />
                      <span>Level 2: Conceptual Level (Logical Level)</span>
                    </span>
                    <Badge variant="purple" size="sm">Community View</Badge>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Describes the entire global logical structure of the database for all users. It defines all entity relations, attributes, data types, relationships, primary keys, and integrity constraints without revealing storage specifics.
                  </p>
                  <div className="text-[11px] font-mono bg-white dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800 text-indigo-700 dark:text-indigo-300">
                    Example: Table `STUDENT` (student_id INT PK, name VARCHAR, course VARCHAR, gpa DECIMAL, email VARCHAR, ...)
                  </div>
                </div>

                {/* Connector 2 */}
                <div className="flex items-center justify-center py-1">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    <ArrowDown className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                    <span>Conceptual / Internal Mapping &bull; Physical Data Independence Barrier</span>
                  </div>
                </div>

                {/* Level 3: Internal */}
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                      <Server className="w-4 h-4 text-emerald-600" />
                      <span>Level 3: Internal Level (Physical Level)</span>
                    </span>
                    <Badge variant="success" size="sm">Storage Layout</Badge>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Describes the physical storage structure, file allocation, record clustering, page sizing, compression, and index access paths (B+ Trees, Hash buckets, Bitmaps).
                  </p>
                  <div className="text-[11px] font-mono bg-white dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-300">
                    Example: B+ Tree clustered file on block device; 4KB page slots, uncompressed secondary index on GPA
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── TAB 3: PHYSICAL VS LOGICAL DATA INDEPENDENCE ──────────────────────── */}
      {activeTab === 'comparison' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Comparison Table */}
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <GitBranch className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Side-by-Side Analysis</span>
              </div>
              <CardTitle className="text-xl mt-1">Physical vs. Logical Data Independence</CardTitle>
              <CardDescription>
                Detailed comparison of the two distinct data independence tiers in database management systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Dimension</th>
                      <th className="p-3.5 text-blue-700 dark:text-blue-400">Physical Data Independence</th>
                      <th className="p-3.5 text-indigo-700 dark:text-indigo-400">Logical Data Independence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Definition</td>
                      <td className="p-3.5">Capacity to modify internal storage schema without changing the conceptual schema.</td>
                      <td className="p-3.5">Capacity to modify conceptual schema without changing external schemas or application programs.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Architecture Level</td>
                      <td className="p-3.5">Between Conceptual Level and Internal / Physical Level.</td>
                      <td className="p-3.5">Between External Level and Conceptual / Logical Level.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Degree of Difficulty</td>
                      <td className="p-3.5 text-emerald-700 dark:text-emerald-400 font-semibold">Easier to achieve (widely supported by commercial DBMSs).</td>
                      <td className="p-3.5 text-amber-700 dark:text-amber-400 font-semibold">Much harder to achieve (application code heavily mirrors logical schemas).</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Typical Operations</td>
                      <td className="p-3.5">Changing Heap to B+ Tree, building secondary indexes, repartitioning, switching from Row Store to Column Store.</td>
                      <td className="p-3.5">Adding an attribute, dropping an unprojected column, renaming an attribute, table decomposition (normalization).</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Responsible Mapping Layer</td>
                      <td className="p-3.5">Conceptual / Internal Mapping (managed by storage manager & query optimizer).</td>
                      <td className="p-3.5">External / Conceptual Mapping (managed by view translation engine).</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Impact on User Queries</td>
                      <td className="p-3.5">Zero impact on query semantics; queries execute faster or slower due to access paths.</td>
                      <td className="p-3.5">Zero impact as long as projected attributes remain accessible; drops of projected columns break views.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold bg-slate-50/50 dark:bg-slate-900/30">Concrete Example</td>
                      <td className="p-3.5">Adding a B+ Tree index on <code>gpa</code> accelerates <code>WHERE gpa &gt; 3.5</code> without altering SQL.</td>
                      <td className="p-3.5">Adding column <code>email</code> to table <code>STUDENT</code> allows <code>StudentView(id, name, course, gpa)</code> to continue unaffected.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── TAB 4: APPLICATIONS, ADVANTAGES & LIMITATIONS ─────────────────────── */}
      {activeTab === 'applications' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Real World Applications */}
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Practical Industry Usage</span>
              </div>
              <CardTitle className="text-xl mt-1">Real-World Enterprise Applications</CardTitle>
              <CardDescription>
                How modern mission-critical systems leverage data independence daily.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">1.</span> Banking & Financial Core Systems
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  When a bank migrates from legacy spinning hard drives to high-speed NVMe flash arrays with B+ Tree clustered indexes, million-line ATM terminal software and mobile apps continue functioning without touching a single line of client code (Physical Data Independence).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">2.</span> Healthcare & Hospital Portals
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hospitals maintain a centralized master patient relational table. Doctors see diagnosis history, nurses see medication schedules, and billing sees insurance data. Adding new medical billing codes to the central table does not perturb physician diagnostic views (Logical Data Independence).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">3.</span> E-Commerce & Retail Catalogs
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Retail giants dynamically add product metadata (e.g., carbon footprint rating, return eligibility) to the product table. Mobile checkout applications that only project product ID, title, and price continue processing orders without failure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400">4.</span> Cloud Analytics & Data Warehousing
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enterprises periodically convert tables from Row-oriented OLTP format into compressed Column-oriented format (e.g., Parquet / Snowflake columnar blocks) to speed up BI reporting by 50x without modifying executive dashboard SQL queries.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advantages vs Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card glass className="border-emerald-300 dark:border-emerald-500/40">
              <CardHeader>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <CardTitle className="text-lg">Key Advantages</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Zero Downtime Optimization:</strong> DBAs can reorganize indexes and tune storage without coordinating releases with software engineering teams.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Drastic Cost Reduction:</strong> Prevents cascading software bugs and eliminates regression testing when database internals evolve.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Role-Based Security:</strong> Restricts access by presenting customized views that omit sensitive conceptual columns.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Agile Database Evolution:</strong> Allows iterative schema enhancements aligned with modern software development lifecycles.</span>
                </div>
              </CardContent>
            </Card>

            <Card glass className="border-amber-300 dark:border-amber-500/40">
              <CardHeader>
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <CardTitle className="text-lg">Known Limitations & Trade-offs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Mapping Overhead:</strong> Every query must undergo dynamic mapping translation through two schema layers, adding minor CPU latency.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Complex Query Optimization:</strong> The DBMS optimizer must navigate multiple access paths, requiring sophisticated statistical cost models.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>Inherent Boundary Constraints:</strong> Logical independence cannot protect an application if a column it directly depends upon is dropped from the base relation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>View Updatability Restrictions:</strong> Complex external views involving joins or aggregations cannot be easily modified with INSERT/UPDATE.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Revision Notes */}
          <Card glass className="border-indigo-300 dark:border-indigo-500/40">
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                <Award className="w-5 h-5" />
                <CardTitle className="text-lg">Quick Revision Summary for Students</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block">External Level</span>
                <p className="text-slate-600 dark:text-slate-400">User views; hides unnecessary data; customized per role.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block">Conceptual Level</span>
                <p className="text-slate-600 dark:text-slate-400">Entities, attributes, relationships, keys; single global schema.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block">Internal Level</span>
                <p className="text-slate-600 dark:text-slate-400">Physical layout, page blocks, B+ Trees, hashing, compression.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block">Golden Rule</span>
                <p className="text-slate-600 dark:text-slate-400">Physical independence is easy; Logical independence is hard!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── TAB 5: EDUCATIONAL VIDEO LECTURES ─────────────────────────────────────────── */}
      {activeTab === 'video' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <Card glass>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Video className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Curated Educational Video Series</span>
                </div>
                <Badge variant="purple" size="sm">{currentVideo.badge}</Badge>
              </div>
              <CardTitle className="text-xl mt-1">{currentVideo.title}</CardTitle>
              <CardDescription>
                {currentVideo.channel} &bull; {currentVideo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Responsive Video Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-black">
                <iframe
                  key={currentVideo.youtubeId}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Active Video Info & Watch on YouTube Button */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    {currentVideo.title}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    Source: {currentVideo.channel} &bull; Direct YouTube Link
                  </span>
                </div>
                <a
                  href={currentVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shrink-0 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 5-Video Playlist Selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Video className="w-4 h-4 text-indigo-500" />
                    <span>Video Lecture Gallery ({EDUCATIONAL_VIDEOS.length} Educational Videos)</span>
                  </h3>
                  <span className="text-xs text-slate-500">Click any video to play</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {EDUCATIONAL_VIDEOS.map((vid, idx) => {
                    const isSelected = vid.youtubeId === currentVideo.youtubeId
                    return (
                      <button
                        key={vid.id}
                        type="button"
                        onClick={() => setSelectedVideoId(vid.youtubeId)}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-sm ring-1 ring-indigo-500'
                            : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-slate-500">Video #{idx + 1}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {vid.badge}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                            {vid.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {vid.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
                          <span className="text-slate-500">{vid.channel}</span>
                          <span className={`font-semibold ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                            {isSelected ? '● Now Playing' : 'Play Video →'}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── TAB 6: REFERENCES ────────────────────────────────────────────────── */}
      {activeTab === 'references' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <Card glass>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Bookmark className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Academic Citations</span>
              </div>
              <CardTitle className="text-xl mt-1">Verified Academic References</CardTitle>
              <CardDescription>
                Authoritative textbook publications, seminal research papers, university portals, and video lectures.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Books */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Authoritative DBMS Textbooks</span>
                </h3>
                <div className="space-y-2.5">
                  {[
                    {
                      title: 'Database System Concepts',
                      authors: 'Abraham Silberschatz, Henry F. Korth, and S. Sudarshan',
                      edition: '7th Edition, McGraw-Hill Higher Education, 2019',
                      chapters: 'Chapter 1: Introduction (Section 1.3: View of Data, Data Independence) & Chapter 14: Storage and File Structure',
                    },
                    {
                      title: 'Fundamentals of Database Systems',
                      authors: 'Ramez Elmasri and Shamkant B. Navathe',
                      edition: '7th Edition, Pearson Education, 2015',
                      chapters: 'Chapter 2: Database System Concepts and Architecture (Section 2.2: The Three-Schema Architecture and Data Independence)',
                    },
                    {
                      title: 'Database Management Systems',
                      authors: 'Raghu Ramakrishnan and Johannes Gehrke',
                      edition: '3rd Edition, McGraw-Hill Science/Engineering/Math, 2003',
                      chapters: 'Chapter 1: Overview of Database Systems (Section 1.5: Describing and Storing Data in a DBMS)',
                    },
                  ].map((book, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">{book.title}</div>
                      <div className="text-slate-600 dark:text-slate-400">Authors: {book.authors} &bull; {book.edition}</div>
                      <div className="text-indigo-700 dark:text-indigo-300 text-[11px] font-medium">{book.chapters}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Papers */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  <span>Seminal Academic Research Papers</span>
                </h3>
                <div className="space-y-2.5">
                  {[
                    {
                      title: 'A Relational Model of Data for Large Shared Data Banks',
                      author: 'Edgar F. Codd (IBM Research)',
                      journal: 'Communications of the ACM (CACM), Vol. 13, No. 6, June 1970, pp. 377–387',
                      significance: 'Introduced the foundational mathematical relational database model explicitly to achieve data independence between application programs and machine representations.',
                    },
                    {
                      title: 'Interim Report 75-02-08 of the Study Group on Database Management Systems',
                      author: 'ANSI/X3/SPARC Study Group on DBMS',
                      journal: 'FDT (Bulletin of ACM SIGMOD), Vol. 7, No. 2, 1975, pp. 1–140',
                      significance: 'Formally codified the Three-Schema Architecture (External, Conceptual, Internal) to standardize physical and logical data independence.',
                    },
                  ].map((paper, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">"{paper.title}"</div>
                      <div className="text-slate-600 dark:text-slate-400">{paper.author} &bull; {paper.journal}</div>
                      <div className="text-slate-500 text-[11px] leading-relaxed pt-0.5">{paper.significance}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educational & University Resources */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>University & Web Learning Resources</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">NPTEL — IIT Kharagpur</span>
                    <p className="text-slate-600 dark:text-slate-400">Database Management System course lectures by Prof. Partha Pratim Das on ANSI/SPARC 3-tier architecture.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">MIT OpenCourseWare (6.814/6.830)</span>
                    <p className="text-slate-600 dark:text-slate-400">Database Systems module covering physical storage layouts, B+ Tree file structures, and data independence.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">Stanford InfoLab DB Series</span>
                    <p className="text-slate-600 dark:text-slate-400">Prof. Jennifer Widom’s DBMS architecture modules on relational views and conceptual-to-physical mappings.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white block">GeeksforGeeks & TutorialsPoint</span>
                    <p className="text-slate-600 dark:text-slate-400">Standard educational guides on Physical vs. Logical Data Independence and Three-Schema architecture.</p>
                  </div>
                </div>
              </div>

              {/* Video Reference */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span>Curated Educational Video References ({EDUCATIONAL_VIDEOS.length} Lectures)</span>
                </h3>
                <div className="space-y-2">
                  {EDUCATIONAL_VIDEOS.map((vid, idx) => (
                    <div
                      key={vid.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-500">#{idx + 1}</span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {vid.title}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {vid.badge}
                          </span>
                        </div>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                          {vid.channel} &bull; {vid.description}
                        </span>
                      </div>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>Watch</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
export default Learn
