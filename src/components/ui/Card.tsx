import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  glass = false,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        hover ? 'hover:-translate-y-0.5 hover:shadow-xl' : ''
      } ${className}`}
      style={{
        backgroundColor: glass ? 'var(--bg-overlay)' : 'var(--card-bg)',
        borderColor: 'var(--border)',
        boxShadow: glass ? '0 8px 32px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.06)',
        backdropFilter: glass ? 'blur(12px)' : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <h3
      className={`text-lg font-semibold tracking-tight ${className}`}
      style={{ color: 'var(--fg)', ...style }}
      {...props}
    >
      {children}
    </h3>
  )
}

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <p
      className={`text-sm mt-1 leading-relaxed ${className}`}
      style={{ color: 'var(--fg-muted)', ...style }}
      {...props}
    >
      {children}
    </p>
  )
}

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-6 pt-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      className={`p-6 pt-3 border-t flex items-center justify-between ${className}`}
      style={{ borderColor: 'var(--border)', ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
