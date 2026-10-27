import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Database, Menu, X, Sun, Moon, BookOpen, FileDown, HelpCircle, Users } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  onToggleMobileMenu: () => void
  isMobileMenuOpen: boolean
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header
      className="sticky top-0 z-30 w-full h-16 backdrop-blur-md border-b px-4 lg:px-8 flex items-center justify-between transition-colors duration-200"
      style={{
        backgroundColor: 'var(--header-bg)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left: Mobile hamburger + Logo */}
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          style={{ color: 'var(--fg-muted)' }}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
            style={{
              backgroundColor: isDark ? 'rgba(99,102,241,0.15)' : '#ede9fe',
              borderColor: isDark ? 'rgba(99,102,241,0.3)' : '#c4b5fd',
              color: isDark ? '#818cf8' : '#6d28d9',
            }}
          >
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1
              className="text-base font-bold tracking-tight leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              style={{ color: 'var(--fg)' }}
            >
              Data Independence Simulator
            </h1>
            <p className="text-xs hidden sm:block" style={{ color: 'var(--fg-muted)' }}>
              Interactive DBMS Learning Environment
            </p>
          </div>
        </Link>
      </div>

      {/* Middle: Quick Action Nav Links (visible on md+) */}
      <nav className="hidden md:flex items-center gap-1.5" aria-label="Header Quick Links">
        {[
          { label: 'Learn', to: '/learn', icon: BookOpen },
          { label: 'Report', to: '/report', icon: FileDown },
          { label: 'Help', to: '/help', icon: HelpCircle },
          { label: 'Team', to: '/developed-by', icon: Users },
        ].map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Right: Status badge + Theme Toggle */}
      <div className="flex items-center gap-3">
        <div className="hidden xl:flex items-center">
          <Badge variant="success" dot size="sm">
            DA1 Engine Online
          </Badge>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:border-slate-400 dark:hover:border-slate-600"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border)',
            color: 'var(--fg-muted)',
          }}
          title={`Switch to ${isDark ? 'light (Day)' : 'dark (Night)'} mode`}
          aria-label="Toggle visual theme"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Day</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Night</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
