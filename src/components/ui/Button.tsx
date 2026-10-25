import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  style,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      border: '1px solid rgba(99,102,241,0.5)',
      boxShadow: '0 4px 12px rgba(99,102,241,0.25)',
    },
    secondary: {
      backgroundColor: 'var(--bg-raised)',
      color: 'var(--fg)',
      border: '1px solid var(--border)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--fg-muted)',
      border: '1px solid var(--border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--fg-muted)',
      border: '1px solid transparent',
    },
    danger: {
      backgroundColor: '#e11d48',
      color: '#ffffff',
      border: '1px solid rgba(225,29,72,0.4)',
      boxShadow: '0 4px 12px rgba(225,29,72,0.2)',
    },
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${
        variant === 'primary' ? 'hover:bg-indigo-500 focus:ring-indigo-500' :
        variant === 'danger' ? 'hover:bg-rose-500 focus:ring-rose-500' :
        'focus:ring-slate-400'
      } ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  )
}
