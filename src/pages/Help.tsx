import React, { useState } from 'react'
import {
  HelpCircle,
  Play,
  Sliders,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Search,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

interface FaqItem {
  q: string
  a: string
  category: 'General' | 'Simulator' | 'Theory'
}

const faqs: FaqItem[] = [
  {
    category: 'General',
    q: 'What is the primary educational goal of this simulator?',
    a: 'The simulator demonstrates how changes at lower architectural tiers (such as switching from a Heap file to a B+ Tree index, or adding a new attribute to a relational table) can take place without breaking external client views or requiring application code rewrites.',
  },
  {
    category: 'Simulator',
    q: 'Why does removing a column sometimes show "AFFECTED" and other times "MAINTAINED"?',
    a: 'Because our external "Student View" queries four specific attributes: Student ID, Name, Course, and GPA. If you remove an attribute NOT in that view (such as email or phone), the view continues working (Logical Independence Maintained). However, if you drop a column that the view directly projects (such as course), the mapping breaks, showing that logical independence has reached its boundary condition!',
  },
  {
    category: 'Simulator',
    q: 'Why does Physical Data Independence always show "MAINTAINED"?',
    a: 'In ANSI/SPARC architecture, the conceptual logical schema (table columns and types) is completely isolated from physical storage layout (pages, file organization, indexes). Changing how blocks are laid out on disk never forces changes upon table definitions.',
  },
  {
    category: 'Theory',
    q: 'What is the difference between Physical and Logical Data Independence?',
    a: 'Physical data independence insulates the conceptual schema from physical storage and index changes. Logical data independence insulates external user views from conceptual schema changes (such as adding or splitting relations). Logical independence is significantly harder to achieve in real systems.',
  },
  {
    category: 'Theory',
    q: 'What role do schema mappings play in the DBMS?',
    a: 'Mappings act as dynamic translation bridges. The Conceptual-to-Internal mapping translates conceptual relational operations into physical disk page access paths. The External-to-Conceptual mapping translates external user queries into conceptual queries. Updating a mapping absorbs changes transparently.',
  },
  {
    category: 'General',
    q: 'How do I generate an execution report for my lab assignment?',
    a: 'Run any simulation in the Simulator or Experiments tab, then click "Download Report" in the navigation bar or within the History panel. You can download a complete audit report in PDF, DOCX, or TXT format containing your exact inputs, processing steps, and before/after comparisons!',
  },
]

export const Help: React.FC = () => {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [faqSearch, setFaqSearch] = useState('')

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  )

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">
            User Manual
          </Badge>
          <Badge variant="info" size="sm">
            Step-by-Step Guide
          </Badge>
          <Badge variant="success" size="sm">
            Beginner Friendly
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>Help & User Manual</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
              Complete guide on operating the Data Independence Simulator, understanding the simulation pipeline, interpreting results, and troubleshooting common issues.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Cpu className="w-4 h-4 fill-white" />}
            onClick={() => navigate('/simulator')}
          >
            Go to Simulator
          </Button>
        </div>
      </div>

      {/* 1. What is this application? */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Overview</span>
          </div>
          <CardTitle className="text-xl mt-1">1. What is this application?</CardTitle>
          <CardDescription>
            An interactive pedagogical environment for exploring ANSI/SPARC database autonomy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            The <strong>Data Independence Simulator</strong> is an educational software platform designed for students, educators, and database developers. It simulates the three architectural tiers of a Database Management System:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/30 text-xs space-y-1">
              <span className="font-bold text-sky-700 dark:text-sky-300 block">External Level (Views)</span>
              <p className="text-slate-600 dark:text-slate-400">The specific queries, dashboards, and fields seen by client applications.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-xs space-y-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Logical Level (Schema)</span>
              <p className="text-slate-600 dark:text-slate-400">The global relational definition: tables, attributes, keys, and constraints.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-xs space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Physical Level (Storage)</span>
              <p className="text-slate-600 dark:text-slate-400">The internal disk blocks, pages, indexes, and file organization methods.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. How to use the Simulator (Step-by-step) */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Play className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Workflow</span>
          </div>
          <CardTitle className="text-xl mt-1">2. How to Use the Simulator — Step-by-Step</CardTitle>
          <CardDescription>
            Follow this 8-step routine during lab practicals or demonstration sessions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              {
                step: 'Step 1',
                title: 'Select Independence Mode',
                desc: 'Toggle between "Physical Data Independence" and "Logical Data Independence" in the top toggle bar.',
              },
              {
                step: 'Step 2',
                title: 'Configure Target Schema',
                desc: 'For Physical: select Storage Method & Index. For Logical: choose Add, Remove, or Rename Column.',
              },
              {
                step: 'Step 3',
                title: 'Execute Simulation',
                desc: 'Click the "Apply Change" button to trigger the execution engine and impact evaluator.',
              },
              {
                step: 'Step 4',
                title: 'Observe Architecture Diff',
                desc: 'Inspect the Three-Schema Architecture cards to see which level transitioned and which remained green.',
              },
              {
                step: 'Step 5',
                title: 'Review Result Panel',
                desc: 'Check the result banner: verify whether Data Independence was MAINTAINED or AFFECTED.',
              },
              {
                step: 'Step 6',
                title: 'Read Pedagogical Explanation',
                desc: 'Expand "Why did this happen?" to read the theoretical rationale and architectural trace.',
              },
              {
                step: 'Step 7',
                title: 'Compare with Experiments',
                desc: 'Visit the "Experiments" page to run structured pre-packaged scenarios with expected outcomes.',
              },
              {
                step: 'Step 8',
                title: 'Download Lab Report',
                desc: 'Navigate to "Download Report" to export a professional PDF, DOCX, or TXT document of your run.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-[11px]">{s.step}</span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{s.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Inputs & Controls Explanation */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sliders className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Controls Guide</span>
          </div>
          <CardTitle className="text-xl mt-1">3. Explanation of Simulator Inputs & Controls</CardTitle>
          <CardDescription>
            Detailed reference for every button, dropdown, and toggle available in the interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Physical Level Controls</span>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Storage Method Dropdown:</strong> Select from 10 storage layouts (Heap, Sequential, B+ Tree, Hash, Clustered, Columnar, ISAM, LSM-Tree, Partitioned, Row Store).
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Index Structure Dropdown:</strong> Select from 10 index algorithms (None, Primary, Secondary, B+ Tree, Hash, Bitmap, Dense, Sparse, Clustered, Composite).
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Logical Level Controls</span>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Operation Dropdown:</strong> Choose ADD, REMOVE, or RENAME column.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Column Select:</strong> Pick from 15 realistic student relation attributes (email, phone, department, semester, age, date_of_birth, etc.).
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">New Column Name:</strong> Input field for specifying the target attribute name when executing a RENAME operation.
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Action Buttons:</span>
              <span className="text-slate-600 dark:text-slate-400">
                <strong>Apply Change:</strong> Runs simulation pipeline. <strong>Reset Simulation:</strong> Restores base initial schemas.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />}>
                Reset
              </Button>
              <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5 fill-white" />}>
                Apply Change
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Processing Flowchart */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Engine Mechanics</span>
          </div>
          <CardTitle className="text-xl mt-1">4. The Simulation Processing Pipeline</CardTitle>
          <CardDescription>
            What happens behind the scenes from the moment you click "Apply Change".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Flow Steps */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            {[
              { num: '1', title: 'User Input', sub: 'Parameters Selected' },
              { num: '2', title: 'Engine Validation', sub: 'Constraint Checking' },
              { num: '3', title: 'Schema Mutation', sub: 'Internal/Logical Diff' },
              { num: '4', title: 'Impact Analysis', sub: 'Mapping Verification' },
              { num: '5', title: 'Final Result', sub: 'Pedagogical Report' },
            ].map((node, i) => (
              <React.Fragment key={node.num}>
                <div className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-w-[130px] shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-1.5">
                    {node.num}
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{node.title}</span>
                  <span className="text-[10px] text-slate-500">{node.sub}</span>
                </div>
                {i < 4 && (
                  <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Common Mistakes & Troubleshooting */}
      <Card glass className="border-amber-300 dark:border-amber-500/40">
        <CardHeader>
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <CardTitle className="text-lg">5. Common Mistakes & Troubleshooting</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 block">
              1. "Storage is already configured to this method..."
            </span>
            <p>
              <strong>Cause:</strong> You clicked "Apply Change" without modifying the storage method or index from its current value.<br />
              <strong>Fix:</strong> Choose a different storage method (e.g. B+ Tree instead of Heap) or a different index structure before clicking Apply.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 block">
              2. "Column already exists in logical schema..."
            </span>
            <p>
              <strong>Cause:</strong> Attempting to add an attribute that is already present in table <code>STUDENT</code>.<br />
              <strong>Fix:</strong> Select an unallocated attribute from the dropdown (disabled options denote columns already present).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 block">
              3. "New column name must be different from current name..."
            </span>
            <p>
              <strong>Cause:</strong> Attempting to rename an existing column to its exact identical name.<br />
              <strong>Fix:</strong> Type a distinct new identifier in the "New Column Name" input box (e.g., <code>program</code> or <code>degree_course</code>).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 6. FAQ Section */}
      <Card glass>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">FAQ</span>
              </div>
              <CardTitle className="text-xl mt-1">6. Frequently Asked Questions</CardTitle>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQ..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-semibold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">
                      {faq.category}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
export default Help
