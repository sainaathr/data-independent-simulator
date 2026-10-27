import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Brain, FileSpreadsheet, ArrowRight, BookOpen } from 'lucide-react'

export default function Practice() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2">
          <Badge variant="purple" size="sm">
            Self-Assessment Lab
          </Badge>
          <Badge variant="info" size="sm">
            Exam Preparation
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Practice & Evaluation Portal
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Reinforce DBMS theoretical principles and Three-Schema concepts through adaptive quizzes and verified competitive examination questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Quizzes Card */}
        <Card glass hover className="flex flex-col justify-between border-indigo-200 dark:border-indigo-500/30">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Brain className="w-6 h-6" />
              </div>
              <Badge variant="purple" size="sm">
                Difficulty-Based
              </Badge>
            </div>
            <div>
              <CardTitle className="text-xl">Interactive DBMS Quizzes</CardTitle>
              <CardDescription className="text-xs mt-1.5 leading-relaxed">
                Test your understanding with tiered questions in Easy, Medium, and Hard difficulty levels with real-time feedback, detailed explanations, and performance metrics.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-white"
              icon={<ArrowRight className="w-4 h-4 text-white" />}
              iconPosition="right"
              onClick={() => navigate('/quizzes')}
            >
              Start Quizzes
            </Button>
          </CardContent>
        </Card>

        {/* Competitive Exam Card */}
        <Card glass hover className="flex flex-col justify-between border-emerald-200 dark:border-emerald-500/30">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <Badge variant="success" size="sm">
                GATE & UGC-NET
              </Badge>
            </div>
            <div>
              <CardTitle className="text-xl">Competitive Exam Questions</CardTitle>
              <CardDescription className="text-xs mt-1.5 leading-relaxed">
                Practice verified historical questions from GATE Computer Science, UGC-NET, and national engineering examinations with step-by-step solutions.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="primary"
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
              style={{ backgroundColor: '#059669', borderColor: '#059669' }}
              icon={<ArrowRight className="w-4 h-4 text-white" />}
              iconPosition="right"
              onClick={() => navigate('/competitive-exam')}
            >
              Start Practice
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Link to Learn */}
      <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-slate-700 dark:text-slate-300">
            Need a quick refresher before taking a quiz?
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/learn')}
          className="shrink-0"
        >
          Review Concepts in Learn Module
        </Button>
      </div>
    </div>
  )
}
