import * as React from "react";
import { cn } from "@/lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "glass" | "solid" | "light";
}

export function Panel({ className, tone = "glass", ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border shadow-2xl shadow-black/20",
        tone === "glass" &&
          "border-white/10 bg-white/[0.055] backdrop-blur-xl",
        tone === "solid" && "border-white/10 bg-slate-950/80",
        tone === "light" && "border-slate-200 bg-white text-slate-950",
        className,
      )}
      {...props}
    />
  );
}
