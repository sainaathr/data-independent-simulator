import React from 'react'
import { Link } from 'react-router-dom'
import { Database, BookOpen, Users, HelpCircle, FileDown } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full border-t backdrop-blur-sm py-6 px-4 lg:px-8 mt-auto transition-colors"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-overlay)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-1 text-center md:text-left">
          <p className="font-semibold flex items-center justify-center md:justify-start gap-1.5" style={{ color: 'var(--fg)' }}>
            <Database className="w-3.5 h-3.5 text-indigo-500" />
            <span>Data Independence Simulator &bull; DBMS Academic Project DA1</span>
          </p>
          <p style={{ color: 'var(--fg-subtle)' }}>
            Developed by R. Sainaath (25BCE1960), Naveena Priyan S (25BCE1778), Nivesh S (25BCE1583) &bull; Guided by Dr. Swaminathan A
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: 'var(--fg-muted)' }}>
          <Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learn</span>
          </Link>
          <Link to="/report" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
            <FileDown className="w-3.5 h-3.5" />
            <span>Report</span>
          </Link>
          <Link to="/help" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </Link>
          <Link to="/developed-by" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
            <Users className="w-3.5 h-3.5" />
            <span>Developed By</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
