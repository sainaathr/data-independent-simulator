import { useState, useMemo } from 'react'
import QuizEngine from '../components/practice/QuizEngine'
import { getQuestionsByDifficulty } from '../data/quizQuestions'
import type { Difficulty } from '../data/quizQuestions'

type SettingsState = 'setup' | 'playing'

export default function Quizzes() {
  const [state, setState] = useState<SettingsState>('setup')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [count, setCount] = useState<number>(10)

  const questions = useMemo(() => {
    if (state !== 'playing') return []
    const all = getQuestionsByDifficulty(difficulty)
    // Shuffle and slice
    const shuffled = [...all].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }, [state, difficulty, count])

  const maxAvailable = useMemo(() => {
    return getQuestionsByDifficulty(difficulty).length
  }, [difficulty])

  const handleStart = () => {
    if (count > maxAvailable) {
      alert(`Only ${maxAvailable} questions available for ${difficulty} difficulty.`)
      return
    }
    setState('playing')
  }

  const handleComplete = (score: number, total: number, correct: number, incorrect: number, topics: string[]) => {
    const attempt = {
      id: Date.now().toString(),
      date: Date.now(),
      type: 'quiz',
      difficulty,
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
          title={`DBMS Quiz - ${difficulty.toUpperCase()} (${count} Questions)`}
          questions={questions}
          type="quiz"
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">Quiz Setup</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure your quiz difficulty and length.</p>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Difficulty</label>
          <div className="grid grid-cols-3 gap-3">
            {(['easy', 'medium', 'hard'] as const).map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`py-3 rounded-xl border font-medium transition-all ${
                  difficulty === level 
                    ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200' 
                    : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 text-right">
            {maxAvailable} questions available in bank
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Number of Questions</label>
          <div className="grid grid-cols-3 gap-3">
            {[10, 15, 25].map(num => (
              <button
                key={num}
                onClick={() => setCount(num)}
                disabled={num > maxAvailable}
                className={`py-3 rounded-xl border font-medium transition-all ${
                  num > maxAvailable ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600' :
                  count === num 
                    ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200' 
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
          disabled={count > maxAvailable}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed shadow-sm"
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}
