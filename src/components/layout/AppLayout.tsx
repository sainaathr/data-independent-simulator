import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export const AppLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  const toggleMobileMenu = () => setIsMobileOpen(prev => !prev)
  const closeMobileMenu = () => setIsMobileOpen(false)

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
    >
      <Header onToggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileOpen} />

      <div className="flex-1 flex w-full">
        <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={closeMobileMenu} />

        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
