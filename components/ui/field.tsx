import * as React from "react";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function FieldShell({ label, hint, error, children }: FieldShellProps) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="flex items-center justify-between gap-3 text-slate-200">
        <span className="font-medium">{label}</span>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </span>
      {children}
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 rounded-lg border border-white/10 bg-white/[0.06] px-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-cyan-300/10",
        invalid && "border-rose-300/60 focus:border-rose-300/70",
        className,
      )}
      {...props}
    />
  );
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-24 rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-cyan-300/10",
        invalid && "border-rose-300/60 focus:border-rose-300/70",
        className,
      )}
      {...props}
    />
  );
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export function Select({ className, invalid, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 rounded-lg border border-white/10 bg-slate-950/80 px-3.5 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/10",
        invalid && "border-rose-300/60 focus:border-rose-300/70",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
