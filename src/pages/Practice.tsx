import { useNavigate } from 'react-router-dom'


export default function Practice() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">Practice</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Practice DBMS concepts through interactive quizzes and competitive exam questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
            <span className="text-2xl">&#x1F9E0;</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Quizzes</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Test your DBMS knowledge with difficulty-based quizzes. Choose from Easy, Medium, or Hard.</p>
          </div>
          <button
            onClick={() => navigate('/quizzes')}
            className="mt-auto w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-900 dark:text-white font-medium transition-colors"
          >
            Start Quizzes
          </button>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col gap-4 hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
            <span className="text-2xl">&#x1F4CB;</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Competitive Exam Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Practice DBMS questions based on competitive examination material including GATE, UGC-NET and more.</p>
          </div>
          <button
            onClick={() => navigate('/competitive-exam')}
            className="mt-auto w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 dark:text-white font-medium transition-colors"
          >
            Start Practice
          </button>
        </div>
      </div>
    </div>
  )
}
