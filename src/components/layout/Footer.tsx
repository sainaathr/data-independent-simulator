import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full border-t backdrop-blur-sm py-4 px-6 lg:px-8 mt-auto"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-overlay)' }}
    >
      <div
        className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style={{ color: 'var(--fg-subtle)' }}
      >
        <p className="font-medium" style={{ color: 'var(--fg-muted)' }}>
          Data Independence Simulator &bull; DBMS Educational Tool
        </p>
        <p>ANSI/SPARC Three-Schema Architecture Exploration Platform</p>
      </div>
    </footer>
  )
}
