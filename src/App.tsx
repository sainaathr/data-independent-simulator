import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Simulator } from './pages/Simulator'
import { Learn } from './pages/Learn'
import { Concepts } from './pages/Concepts'
import { Experiments } from './pages/Experiments'
import { History } from './pages/History'
import Practice from './pages/Practice'
import Quizzes from './pages/Quizzes'
import CompetitiveExam from './pages/CompetitiveExam'
import { Report } from './pages/Report'
import { Help } from './pages/Help'
import { DevelopedBy } from './pages/DevelopedBy'
import { SimulationProvider } from './context/SimulationContext'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <SimulationProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="simulator" element={<Simulator />} />
              <Route path="learn" element={<Learn />} />
              <Route path="concepts" element={<Concepts />} />
              <Route path="experiments" element={<Experiments />} />
              <Route path="history" element={<History />} />
              <Route path="practice" element={<Practice />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="competitive-exam" element={<CompetitiveExam />} />
              <Route path="report" element={<Report />} />
              <Route path="help" element={<Help />} />
              <Route path="developed-by" element={<DevelopedBy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SimulationProvider>
    </ThemeProvider>
  )
}
