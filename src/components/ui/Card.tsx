import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, noPadding = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface border border-muted rounded-xl overflow-hidden',
        !noPadding && 'p-4',
        className
      )}
      style={{ backgroundColor: 'var(--surface)', ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
};
