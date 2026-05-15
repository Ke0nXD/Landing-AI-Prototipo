"use client";

import Link from "next/link";
import { ArrowLeft, Smartphone, Laptop } from "lucide-react";
import { GeneratedLandingPreview } from "@/components/landing/generated-landing-preview";
import { buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { sampleLanding } from "@/lib/ai/sample";
import { cn } from "@/lib/utils";
import type { VisualTone } from "@/types/landing";
import { useState } from "react";

type PreviewViewport = "desktop" | "mobile";

const toneOptions: { label: string; value: VisualTone }[] = [
  { label: "Premium dark", value: "premium-dark" },
  { label: "Minimal claro", value: "minimal-light" },
  { label: "Tech neon", value: "tech-neon" },
  { label: "Corporativo", value: "corporate-elegant" },
];

const viewportOptions: { label: string; value: PreviewViewport }[] = [
  { label: "Desktop", value: "desktop" },
  { label: "Mobile", value: "mobile" },
];

export function PreviewStudio() {
  const [tone, setTone] = useState<VisualTone>("premium-dark");
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");

  return (
    <main className="min-h-screen bg-[#050914] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_80%_8%,rgba(168,85,247,0.14),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-5">
        <Panel className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "mb-2 -ml-3",
                )}
                href="/"
              >
                <ArrowLeft className="size-4" />
                Voltar
              </Link>
              <h1 className="text-3xl font-semibold tracking-normal">
                Preview editavel da landing gerada
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Esta rota mostra a experiencia de preview isolada, pronta para
                receber dados persistidos por Supabase no roadmap.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[300px_220px]">
              <SegmentedControl
                label="Tom visual"
                onChange={setTone}
                options={toneOptions}
                value={tone}
              />
              <div className="grid gap-2">
                <SegmentedControl
                  compact
                  label="Viewport"
                  onChange={setViewport}
                  options={viewportOptions}
                  value={viewport}
                />
                <div className="flex gap-2">
                  <button
                    aria-label="Desktop"
                    className={cn(
                      "grid size-10 place-items-center rounded-full border border-white/10",
                      viewport === "desktop" && "bg-cyan-300 text-slate-950",
                    )}
                    onClick={() => setViewport("desktop")}
                    type="button"
                  >
                    <Laptop className="size-4" />
                  </button>
                  <button
                    aria-label="Mobile"
                    className={cn(
                      "grid size-10 place-items-center rounded-full border border-white/10",
                      viewport === "mobile" && "bg-cyan-300 text-slate-950",
                    )}
                    onClick={() => setViewport("mobile")}
                    type="button"
                  >
                    <Smartphone className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <GeneratedLandingPreview
          landing={sampleLanding}
          tone={tone}
          viewport={viewport}
        />
      </div>
    </main>
  );
}
