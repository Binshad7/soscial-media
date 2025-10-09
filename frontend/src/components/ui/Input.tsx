'use client'
import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ label, icon, className, handleOnChange, ...props }: InputProps) {

  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400">{icon}</div>}
        <input
         onChange={(e) => handleOnChange?.(e)}
          className={cn(
            'w-full h-12 pl-10 pr-4 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all',
            !icon && 'pl-4',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}