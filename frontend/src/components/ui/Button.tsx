'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Utility for merging Tailwind classes

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'social';
  icon?: ReactNode;
}

export default function Button({ variant = 'primary', icon, children, className, ...props }: ButtonProps) {
  const baseStyles = 'w-full h-12 flex items-center justify-center gap-3 rounded-lg font-semibold transition-all';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/50',
    social: 'border border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800',
  };

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {icon}
      {children}
    </button>
  );
}