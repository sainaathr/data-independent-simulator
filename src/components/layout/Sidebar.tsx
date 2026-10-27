import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Cpu,
  BookOpen,
  FlaskConical,
  History,
  Layers,
  FileDown,
  HelpCircle,
  Users,
} from 'lucide-react'

interface SidebarProps {
  isMobileOpen: boolean
  onCloseMobile: () => void
}

interface NavItem {
  label: string
  to: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  badge?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const navItems: NavItem[] = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Simulator', to: '/simulator', icon: Cpu },
    { label: 'Learn', to: '/learn', icon: BookOpen },
    { label: 'Practice', to: '/practice', icon: Layers },
    { label: 'Experiments', to: '/experiments', icon: FlaskConical },
    { label: 'History', to: '/history', icon: History },
    { label: 'Download Report', to: '/report', icon: FileDown },
    { label: 'Help / Manual', to: '/help', icon: HelpCircle },
    { label: 'Developed By', to: '/developed-by', icon: Users },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 backdrop-blur-lg border-r flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Brand block */}
          <div className="px-2 py-1">
            <div
              className="flex items-center gap-2 font-semibold text-xs tracking-wider uppercase mb-1"
              style={{ color: 'var(--fg-subtle)' }}
            >
              <Layers className="w-4 h-4" style={{ color: '#6366f1' }} />
              <span>Three-Schema Lab</span>
            </div>
            <h2 className="text-sm font-bold" style={{ color: 'var(--fg)' }}>Data Independence</h2>
            <p className="text-[11px]" style={{ color: 'var(--fg-subtle)' }}>DBMS Educational Platform</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                      isActive
                        ? 'border-indigo-400/40'
                        : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: 'rgba(99,102,241,0.12)',
                          color: '#818cf8',
                        }
                      : {
                          color: 'var(--fg-muted)',
                        }
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3.5 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div
            className="p-2.5 rounded-xl border text-[11px] space-y-0.5"
            style={{
              backgroundColor: 'var(--bg-raised)',
              borderColor: 'var(--border)',
              color: 'var(--fg-muted)',
            }}
          >
            <div className="font-semibold" style={{ color: 'var(--fg)' }}>DA1 Project Edition</div>
            <p className="text-[10px] leading-tight" style={{ color: 'var(--fg-subtle)' }}>
              ANSI/SPARC Three-Schema Model Engine
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
