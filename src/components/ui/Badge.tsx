import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'danger' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}) => {
  const variants = {
    default: 'bg-primary/10 text-primary border border-primary',
    outline: 'bg-transparent text-white border border-muted',
    secondary: 'bg-surface text-gray-400 border border-muted',
    danger: 'bg-danger/10 text-danger border border-danger',
    warning: 'bg-warning/10 text-warning border border-warning',
  };

  return (
    <span 
      className={cn(
        'px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold',
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
};
