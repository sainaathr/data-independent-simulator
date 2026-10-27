import { useState, useMemo } from 'react'
import QuizEngine from '../components/practice/QuizEngine'
import { competitiveQuestions } from '../data/competitiveQuestionsData'
import type { ExamDifficulty } from '../data/competitiveQuestionsData'

type SettingsState = 'setup' | 'playing'
type ExamFilter = 'All' | 'GATE' | 'UGC-NET' | 'Other verified exams' | 'Competitive Exam Style'
type DiffFilter = 'All' | ExamDifficulty

export default function CompetitiveExam() {
  const [state, setState] = useState<SettingsState>('setup')
  const [examFilter, setExamFilter] = useState<ExamFilter>('All')
  const [diffFilter, setDiffFilter] = useState<DiffFilter>('All')
  const [count, setCount] = useState<number>(10)

  const filteredBank = useMemo(() => {
    return competitiveQuestions.filter(q => {
      const matchExam = examFilter === 'All' 
        ? true 
        : examFilter === 'Other verified exams' 
          ? !['GATE', 'UGC-NET', 'Competitive Exam Style'].includes(q.exam)
          : q.exam === examFilter
          
      const matchDiff = diffFilter === 'All' ? true : q.difficulty === diffFilter
      return matchExam && matchDiff
    })
  }, [examFilter, diffFilter])

  const maxAvailable = filteredBank.length

  const questions = useMemo(() => {
    if (state !== 'playing') return []
    // Shuffle and slice
    const shuffled = [...filteredBank].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }, [state, filteredBank, count])


  const handleStart = () => {
    if (count > maxAvailable) {
      alert(`Only ${maxAvailable} questions available for these filters.`)
      return
    }
    setState('playing')
  }

  const handleComplete = (score: number, total: number, correct: number, incorrect: number, topics: string[]) => {
    const attempt = {
      id: Date.now().toString(),
      date: Date.now(),
      type: 'competitive',
      examFilter,
      diffFilter,
      count,
      score,
      percentage: Math.round((correct / total) * 100),
      correct,
      incorrect,
      topics
    }
    const history = JSON.parse(localStorage.getItem('practiceHistory') || '[]')
    history.push(attempt)
    localStorage.setItem('practiceHistory', JSON.stringify(history))
  }

  if (state === 'playing') {
    return (
      <div className="py-8 px-4">
        <QuizEngine
          title={`Competitive Exam Practice (${count} Questions)`}
          questions={questions}
          type="competitive"
          onComplete={handleComplete}
          onRetry={() => setState('playing')}
          onChangeSettings={() => setState('setup')}
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">Competitive Exam Setup</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure your practice session using verified exam questions.</p>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 md:p-8 space-y-8">
        
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Exam Source</label>
          <div className="flex flex-wrap gap-3">
            {(['All', 'GATE', 'UGC-NET', 'Other verified exams', 'Competitive Exam Style'] as const).map(exam => (
              <button
                key={exam}
                onClick={() => setExamFilter(exam)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  examFilter === exam 
                    ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200' 
                    : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Difficulty</label>
          <div className="flex flex-wrap gap-3">
            {(['All', 'easy', 'medium', 'hard'] as const).map(level => (
              <button
                key={level}
                onClick={() => setDiffFilter(level)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  diffFilter === level 
                    ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200' 
                    : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 text-right">
            {maxAvailable} questions available for selected filters
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Number of Questions</label>
          <div className="grid grid-cols-3 gap-3">
            {[10, 15, 25].map(num => (
              <button
                key={num}
                onClick={() => setCount(num)}
                disabled={num > maxAvailable && maxAvailable > 0 ? false : num > maxAvailable}
                className={`py-3 rounded-xl border font-medium transition-all ${
                  num > maxAvailable ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600' :
                  count === num 
                    ? 'border-violet-500 bg-violet-100 dark:bg-violet-500/20 text-violet-800 dark:text-violet-200' 
                    : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={maxAvailable === 0 || count > maxAvailable}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed shadow-sm"
        >
          {maxAvailable === 0 ? 'No Questions Available' : 'Start Practice'}
        </button>
      </div>
    </div>
  )
}
