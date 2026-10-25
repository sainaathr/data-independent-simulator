import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { QuizQuestion } from '../../data/quizQuestions'
import type { CompetitiveQuestion } from '../../data/competitiveQuestionsData'

export type AnyQuestion = QuizQuestion | CompetitiveQuestion

interface QuizEngineProps {
  title: string
  questions: AnyQuestion[]
  type: 'quiz' | 'competitive'
  onComplete: (score: number, total: number, correct: number, incorrect: number, topics: string[]) => void
  onRetry: () => void
  onChangeSettings: () => void
}

export default function QuizEngine({ title, questions, type, onComplete, onRetry, onChangeSettings }: QuizEngineProps) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [topicsToReview, setTopicsToReview] = useState<Set<string>>(new Set())

  const question = questions[currentIndex]
  const total = questions.length

  const handleReveal = () => {
    if (selectedOption === null) return
    setIsRevealed(true)

    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(question.correctAnswer)

    if (selectedOption === correctIndex) {
      setCorrectCount(prev => prev + 1)
    } else {
      setIncorrectCount(prev => prev + 1)
      setTopicsToReview(prev => new Set(prev).add(question.topic))
    }
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setIsRevealed(false)
    } else {
      setIsFinished(true)
      onComplete(
        correctCount,
        total,
        correctCount,
        incorrectCount,
        Array.from(topicsToReview)
      )
    }
  }

  if (isFinished) {
    const percentage = Math.round((correctCount / total) * 100)
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quiz Complete!</h2>
          <div className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 my-6">{percentage}%</div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-xl">
              <div className="text-slate-600 dark:text-slate-400 text-sm">Score</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{correctCount} / {total}</div>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-xl">
              <div className="text-slate-600 dark:text-slate-400 text-sm">Accuracy</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{percentage}%</div>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-xl">
              <div className="text-slate-600 dark:text-slate-400 text-sm">Correct</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{correctCount}</div>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-xl">
              <div className="text-slate-600 dark:text-slate-400 text-sm">Incorrect</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{incorrectCount}</div>
            </div>
          </div>

          {topicsToReview.size > 0 && (
            <div className="text-left bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-300 dark:border-slate-700 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Topics to Review</h3>
              <ul className="list-disc list-inside text-rose-300 space-y-1">
                {Array.from(topicsToReview).map(topic => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={onRetry} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-900 dark:text-white font-medium transition-colors">
              Retry Quiz
            </button>
            <button onClick={onChangeSettings} className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-600 text-slate-900 dark:text-white font-medium transition-colors">
              Change Settings
            </button>
            <button onClick={() => navigate('/concepts')} className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 dark:text-white font-medium transition-colors">
              Learn Concepts
            </button>
            <button onClick={() => navigate('/simulator')} className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-slate-900 dark:text-white font-medium transition-colors">
              Open Simulator
            </button>
          </div>
        </div>
      </div>
    )
  }

  const correctIndex = ['A', 'B', 'C', 'D'].indexOf(question.correctAnswer)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{title}</h2>
        <div className="text-slate-600 dark:text-slate-400">Question {currentIndex + 1} of {total}</div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-500 h-full transition-all duration-300" 
          style={{ width: `${((currentIndex) / total) * 100}%` }}
        />
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 md:p-8">
        {type === 'competitive' && 'exam' in question && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="text-indigo-600 dark:text-indigo-400">{question.exam}</span>
            {question.year && <span className="text-slate-500">• {question.year}</span>}
            <span className="text-slate-500">• {question.topic}</span>
          </div>
        )}

        <h3 className="text-lg md:text-xl text-slate-900 dark:text-slate-100 font-medium mb-8 whitespace-pre-wrap">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx
            const isCorrectOption = idx === correctIndex

            let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 "
            
            if (!isRevealed) {
              btnClass += isSelected 
                ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-100" 
                : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-100 dark:bg-slate-800 cursor-pointer"
            } else {
              if (isCorrectOption) {
                btnClass += "border-emerald-500 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-100"
              } else if (isSelected && !isCorrectOption) {
                btnClass += "border-rose-500 bg-rose-500/10 text-rose-100"
              } else {
                btnClass += "border-slate-300 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30 text-slate-500 opacity-50"
              }
            }

            return (
              <button
                key={idx}
                disabled={isRevealed}
                onClick={() => setSelectedOption(idx)}
                className={btnClass}
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold
                    ${!isRevealed && isSelected ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : ''}
                    ${!isRevealed && !isSelected ? 'border-slate-400 dark:border-slate-600 text-slate-500' : ''}
                    ${isRevealed && isCorrectOption ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10' : ''}
                    ${isRevealed && isSelected && !isCorrectOption ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-500/10' : ''}
                    ${isRevealed && !isSelected && !isCorrectOption ? 'border-slate-300 dark:border-slate-700 text-slate-600' : ''}
                  `}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {!isRevealed ? (
        <button
          disabled={selectedOption === null}
          onClick={handleReveal}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:bg-slate-700 disabled:text-slate-500 text-slate-900 dark:text-white font-medium transition-colors"
        >
          Reveal Answer
        </button>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
          <div className={`p-6 rounded-2xl border ${selectedOption === correctIndex ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-rose-900/20 border-rose-500/30'}`}>
            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">
                {selectedOption === correctIndex ? '✨' : '💪'}
              </div>
              <div>
                <h4 className={`text-lg font-bold mb-2 ${selectedOption === correctIndex ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {selectedOption === correctIndex ? 'Very well done! You got the right answer.' : 'You still need to ace this topic — keep going!'}
                </h4>
                <div className="text-slate-700 dark:text-slate-300 mb-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Correct Answer:</span> {question.correctAnswer}. {question.options[correctIndex]}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Explanation:</span> {question.explanation}
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-900 dark:text-white font-bold transition-colors"
          >
            {currentIndex < total - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  )
}
