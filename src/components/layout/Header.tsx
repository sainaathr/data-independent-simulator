import React from 'react'
import { Database, Menu, X, Sun, Moon } from 'lucide-react'
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
          className="lg:hidden p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          style={{ color: 'var(--fg-muted)' }}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
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
              className="text-base font-bold tracking-tight leading-tight"
              style={{ color: 'var(--fg)' }}
            >
              Data Independence Simulator
            </h1>
            <p className="text-xs hidden sm:block" style={{ color: 'var(--fg-muted)' }}>
              Interactive DBMS Learning Environment
            </p>
          </div>
        </div>
      </div>

      {/* Right: Status badge + Theme Toggle */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center">
          <Badge variant="success" dot size="md">
            System Ready
          </Badge>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border)',
            color: 'var(--fg-muted)',
          }}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          aria-label="Toggle visual theme"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
