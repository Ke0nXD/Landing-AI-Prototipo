"use client";

import { cn } from "@/lib/utils";

interface SegmentedControlProps<T extends string> {
  label: string;
  value: T;
  options: {
    label: string;
    value: T;
  }[];
  onChange: (value: T) => void;
  compact?: boolean;
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  compact,
}: SegmentedControlProps<T>) {
  return (
    <div className="grid gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div
        className={cn(
          "grid rounded-full border border-white/10 bg-white/[0.055] p-1",
          compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4",
        )}
      >
        {options.map((option) => (
          <button
            className={cn(
              "rounded-full px-3 py-2 text-xs font-semibold text-slate-400 transition hover:text-white",
              value === option.value &&
                "bg-cyan-300 text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.22)] hover:text-slate-950",
            )}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
