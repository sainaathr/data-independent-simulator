import React from 'react'
import {
  Users,
  Award,
  BookOpen,
  Layers,
  Sparkles,
  Camera,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

interface TeamMember {
  name: string
  regNo: string
  role: string
  contributions: string[]
  initials: string
  image?: string
}

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`

const teamMembers: TeamMember[] = [
  {
    name: 'R. SAINAATH',
    regNo: '25BCE1960',
    role: 'Student Developer',
    initials: 'RS',
    image: `${base}sainaath.jpg`,
    contributions: [
      'Interactive Three-Schema Architecture visualization engine',
      'Simulation state evaluation and mapping mechanics',
      'Report download system integration (PDF, DOCX, TXT)',
    ],
  },
  {
    name: 'NAVEENA PRIYAN S',
    regNo: '25BCE1778',
    role: 'Student Developer',
    initials: 'NP',
    image: `${base}naveena.jpg`,
    contributions: [
      'DBMS Storage Methods and Index Structures catalog',
      'Logical and Physical Data Independence execution logic',
      'Curriculum Learn module and verified academic citations',
    ],
  },
  {
    name: 'NIVESH S',
    regNo: '25BCE1583',
    role: 'Student Developer',
    initials: 'NS',
    image: `${base}nivesh.jpg`,
    contributions: [
      'Interactive Practice, Quizzes, and Competitive Exam system',
      'User manual, Help guide, and error validation pipeline',
      'Global Day/Night responsive design tokens and aesthetics',
    ],
  },
]

export const DevelopedBy: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">
            Project Presentation
          </Badge>
          <Badge variant="info" size="sm">
            Academic Assessment DA1
          </Badge>
          <Badge variant="success" size="sm">
            Team Credits
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>Developed By — Project Team</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
              Meet the student engineering team and faculty guide responsible for the Data Independence Simulator application.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            icon={<Layers className="w-4 h-4" />}
            onClick={() => navigate('/simulator')}
          >
            Launch Simulator
          </Button>
        </div>
      </div>

      {/* Faculty Guide Card */}
      <Card glass className="border-indigo-300 dark:border-indigo-500/40 overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Guide Photo */}
            <div className="w-32 h-36 rounded-2xl border-2 border-indigo-400/80 dark:border-indigo-500/80 bg-white dark:bg-slate-900 overflow-hidden shrink-0 shadow-md relative group">
              <img
                src={`${base}dr-swaminathan.jpg`}
                alt="Dr. Swaminathan A - Assistant Professor"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Project Guidance & Mentorship</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Dr. Swaminathan A
              </h2>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Assistant Professor
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed pt-1">
                Faculty mentor guiding the design, theoretical correctness, ANSI/SPARC mapping fidelity, and educational pedagogy of the Data Independence Simulator project.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Student Team Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Award className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Student Engineering Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((student, idx) => (
            <Card key={student.regNo} glass hover className="flex flex-col justify-between group">
              <CardHeader className="pb-4">
                {/* Photo Frame (Actual Image or Placeholder) */}
                {student.image ? (
                  <div className="w-full aspect-[4/3] rounded-2xl border border-indigo-200 dark:border-indigo-500/30 overflow-hidden relative group-hover:border-indigo-400 transition-colors shadow-sm bg-slate-900">
                    <img
                      src={student.image}
                      alt={`${student.name} (${student.regNo})`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-white">
                      Member #{idx + 1}
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group-hover:border-indigo-400 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-lg mb-2">
                      {student.initials}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-slate-400" />
                      <span>Student Photo</span>
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Placeholder for {student.name}
                    </span>
                    <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Member #{idx + 1}
                    </div>
                  </div>
                )}

                {/* Name & Register Number */}
                <div className="pt-4 space-y-1">
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {student.role}
                  </div>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">
                    {student.name}
                  </CardTitle>
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    Reg. No: {student.regNo}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-3">
                <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Core Modules Developed:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {student.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Academic Meta Box */}
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-5 h-5" />
            <CardTitle className="text-base">Course & Institutional Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Course</span>
            <span className="text-slate-900 dark:text-white font-semibold">Database Management Systems</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Academic Evaluation</span>
            <span className="text-slate-900 dark:text-white font-semibold">DA1 Comprehensive Project</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Architecture Standard</span>
            <span className="text-slate-900 dark:text-white font-semibold">ANSI / SPARC Three-Schema</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Submission Status</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete & Ready for Evaluation
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default DevelopedBy
