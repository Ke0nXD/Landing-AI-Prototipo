"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Clipboard,
  Download,
  Laptop,
  Loader2,
  PanelRight,
  Save,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { generateLandingAction } from "@/app/actions";
import { GeneratedLandingPreview } from "@/components/landing/generated-landing-preview";
import { MarketingKitGrid } from "@/components/marketing/marketing-kit-grid";
import { Button } from "@/components/ui/button";
import { FieldShell, Input, Select, Textarea } from "@/components/ui/field";
import { Panel } from "@/components/ui/panel";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { sampleLanding } from "@/lib/ai/sample";
import { cn } from "@/lib/utils";
import type {
  GenerateLandingError,
  GeneratedLanding,
  LandingInput,
  VisualTone,
} from "@/types/landing";

type WorkspaceTab = "brief" | "editor" | "marketing";
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

export function DashboardWorkspace() {
  const [form, setForm] = useState<LandingInput>(sampleLanding.input);
  const [landing, setLanding] = useState<GeneratedLanding>(sampleLanding);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("brief");
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [visualTone, setVisualTone] = useState<VisualTone>(
    sampleLanding.input.visualTone,
  );
  const [actionError, setActionError] = useState<GenerateLandingError | null>(
    null,
  );
  const [copyStatus, setCopyStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  const jsonContent = useMemo(() => JSON.stringify(landing, null, 2), [landing]);

  function updateForm(field: keyof LandingInput, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateTone(value: VisualTone) {
    setVisualTone(value);
    setForm((current) => ({
      ...current,
      visualTone: value,
    }));
    setLanding((current) => ({
      ...current,
      input: {
        ...current.input,
        visualTone: value,
      },
      designSystem: {
        ...current.designSystem,
        tone: value,
      },
    }));
  }

  function handleGenerate() {
    setCopyStatus("");
    startTransition(async () => {
      const result = await generateLandingAction(form);

      if (!result.ok) {
        setActionError(result);
        return;
      }

      setLanding(result.data);
      setVisualTone(result.data.input.visualTone);
      setActionError(null);
      setActiveTab("editor");
    });
  }

  async function copyJson() {
    await navigator.clipboard.writeText(jsonContent);
    setCopyStatus("Conteudo copiado");
  }

  function exportJson() {
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${landing.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_85%_5%,rgba(168,85,247,0.16),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0),#050914_70%)]" />
      <main className="relative mx-auto flex w-full max-w-[1540px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.32)]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-100">
                AI Landing Lab
              </p>
              <h1 className="text-xl font-semibold tracking-normal md:text-2xl">
                Gerador, preview e marketing kit em um cockpit
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabItems.map((item) => (
              <button
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold text-slate-400 transition",
                  activeTab === item.value
                    ? "bg-white text-slate-950"
                    : "hover:bg-white/[0.08] hover:text-white",
                )}
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[390px_minmax(0,1fr)_390px]">
          <aside className="grid gap-5 xl:sticky xl:top-5 xl:self-start">
            <Panel className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Briefing</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Dados validados no servidor antes de gerar.
                  </p>
                </div>
                <Save className="size-5 text-cyan-200" />
              </div>

              <div className="grid gap-4">
                <FieldShell
                  error={actionError?.fieldErrors.businessName?.[0]}
                  label="Nome do negocio"
                >
                  <Input
                    invalid={Boolean(actionError?.fieldErrors.businessName)}
                    maxLength={80}
                    onChange={(event) =>
                      updateForm("businessName", event.target.value)
                    }
                    placeholder="Ex: Nova Clinic"
                    value={form.businessName}
                  />
                </FieldShell>

                <FieldShell
                  error={actionError?.fieldErrors.niche?.[0]}
                  label="Nicho"
                >
                  <Input
                    invalid={Boolean(actionError?.fieldErrors.niche)}
                    maxLength={80}
                    onChange={(event) => updateForm("niche", event.target.value)}
                    placeholder="Ex: SaaS B2B, healthtech..."
                    value={form.niche}
                  />
                </FieldShell>

                <FieldShell
                  error={actionError?.fieldErrors.audience?.[0]}
                  label="Publico-alvo"
                >
                  <Textarea
                    invalid={Boolean(actionError?.fieldErrors.audience)}
                    maxLength={160}
                    onChange={(event) =>
                      updateForm("audience", event.target.value)
                    }
                    placeholder="Quem compra, decide ou influencia?"
                    value={form.audience}
                  />
                </FieldShell>

                <FieldShell
                  error={actionError?.fieldErrors.offer?.[0]}
                  label="Principal oferta"
                >
                  <Textarea
                    invalid={Boolean(actionError?.fieldErrors.offer)}
                    maxLength={180}
                    onChange={(event) => updateForm("offer", event.target.value)}
                    placeholder="O que sera vendido nesta landing?"
                    value={form.offer}
                  />
                </FieldShell>

                <FieldShell
                  error={actionError?.fieldErrors.brandTone?.[0]}
                  label="Tom da marca"
                >
                  <Select
                    invalid={Boolean(actionError?.fieldErrors.brandTone)}
                    onChange={(event) =>
                      updateForm("brandTone", event.target.value)
                    }
                    value={form.brandTone}
                  >
                    <option>consultivo e premium</option>
                    <option>direto e comercial</option>
                    <option>calmo e minimalista</option>
                    <option>tecnico e visionario</option>
                    <option>elegante e corporativo</option>
                  </Select>
                </FieldShell>

                <FieldShell
                  error={actionError?.fieldErrors.pageGoal?.[0]}
                  label="Objetivo da pagina"
                >
                  <Textarea
                    invalid={Boolean(actionError?.fieldErrors.pageGoal)}
                    maxLength={180}
                    onChange={(event) =>
                      updateForm("pageGoal", event.target.value)
                    }
                    placeholder="Ex: gerar leads, vender plano, agendar demo..."
                    value={form.pageGoal}
                  />
                </FieldShell>

                <SegmentedControl
                  label="Tom visual"
                  onChange={updateTone}
                  options={toneOptions}
                  value={visualTone}
                />

                {actionError?.formError ? (
                  <p className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-100">
                    {actionError.formError}
                  </p>
                ) : null}

                <Button
                  className="w-full"
                  disabled={isPending}
                  onClick={handleGenerate}
                  size="lg"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  Gerar estrutura
                </Button>
              </div>
            </Panel>
          </aside>

          <section className="grid min-w-0 gap-5">
            <Panel className="p-4">
              <div className="mb-4 flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Preview em tempo real</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Edite textos no painel e veja a landing mudar na hora.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-[260px_190px]">
                  <SegmentedControl
                    compact
                    label="Viewport"
                    onChange={setViewport}
                    options={viewportOptions}
                    value={viewport}
                  />
                  <div className="flex items-end gap-2">
                    <Button
                      aria-label="Mostrar desktop"
                      onClick={() => setViewport("desktop")}
                      size="icon"
                      variant={viewport === "desktop" ? "primary" : "secondary"}
                    >
                      <Laptop className="size-4" />
                    </Button>
                    <Button
                      aria-label="Mostrar mobile"
                      onClick={() => setViewport("mobile")}
                      size="icon"
                      variant={viewport === "mobile" ? "primary" : "secondary"}
                    >
                      <Smartphone className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <GeneratedLandingPreview
                landing={landing}
                tone={visualTone}
                viewport={viewport}
              />
            </Panel>
          </section>

          <aside className="grid gap-5 xl:sticky xl:top-5 xl:self-start">
            {activeTab === "brief" ? (
              <BriefSummary landing={landing} />
            ) : activeTab === "editor" ? (
              <EditorPanel
                copyJson={copyJson}
                copyStatus={copyStatus}
                exportJson={exportJson}
                landing={landing}
                setLanding={setLanding}
              />
            ) : (
              <Panel className="p-5">
                <div className="mb-5 flex items-center gap-3">
                  <PanelRight className="size-5 text-cyan-200" />
                  <div>
                    <h2 className="text-lg font-semibold">Marketing Kit</h2>
                    <p className="text-sm text-slate-400">
                      Ideias geradas a partir da landing atual.
                    </p>
                  </div>
                </div>
                <MarketingKitGrid compact kit={landing.marketingKit} />
              </Panel>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}

function BriefSummary({ landing }: { landing: GeneratedLanding }) {
  return (
    <Panel className="p-5">
      <h2 className="text-lg font-semibold">Estrutura gerada</h2>
      <p className="mt-1 text-sm text-slate-400">
        Mapa de secoes, objecoes e componentes sugeridos.
      </p>
      <div className="mt-5 grid gap-3">
        {landing.structure.map((section) => (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3" key={section.id}>
            <p className="text-sm font-semibold text-white">{section.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {section.purpose}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-4">
        <p className="text-sm font-semibold text-cyan-100">
          Design system sugerido
        </p>
        <div className="mt-3 grid gap-2 text-xs text-slate-300">
          {landing.designSystem.components.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

interface EditorPanelProps {
  landing: GeneratedLanding;
  setLanding: React.Dispatch<React.SetStateAction<GeneratedLanding>>;
  copyJson: () => Promise<void>;
  exportJson: () => void;
  copyStatus: string;
}

function EditorPanel({
  landing,
  setLanding,
  copyJson,
  exportJson,
  copyStatus,
}: EditorPanelProps) {
  function updateArray(
    field: "benefits" | "pains",
    index: number,
    value: string,
  ) {
    setLanding((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  }

  function updateFaq(index: number, key: "question" | "answer", value: string) {
    setLanding((current) => ({
      ...current,
      faq: current.faq.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  return (
    <Panel className="p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Editor simples</h2>
          <p className="text-sm text-slate-400">
            Textos, CTAs, beneficios e FAQ.
          </p>
        </div>
        <div className="flex gap-2">
          <Button aria-label="Copiar JSON" onClick={copyJson} size="icon" variant="secondary">
            <Clipboard className="size-4" />
          </Button>
          <Button aria-label="Exportar JSON" onClick={exportJson} size="icon" variant="secondary">
            <Download className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <FieldShell label="Headline">
          <Textarea
            onChange={(event) =>
              setLanding((current) => ({
                ...current,
                headline: event.target.value,
              }))
            }
            value={landing.headline}
          />
        </FieldShell>
        <FieldShell label="Subheadline">
          <Textarea
            onChange={(event) =>
              setLanding((current) => ({
                ...current,
                subheadline: event.target.value,
              }))
            }
            value={landing.subheadline}
          />
        </FieldShell>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <FieldShell label="CTA principal">
            <Input
              onChange={(event) =>
                setLanding((current) => ({
                  ...current,
                  ctas: { ...current.ctas, primary: event.target.value },
                }))
              }
              value={landing.ctas.primary}
            />
          </FieldShell>
          <FieldShell label="CTA secundario">
            <Input
              onChange={(event) =>
                setLanding((current) => ({
                  ...current,
                  ctas: { ...current.ctas, secondary: event.target.value },
                }))
              }
              value={landing.ctas.secondary}
            />
          </FieldShell>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold text-white">Beneficios</p>
          {landing.benefits.map((benefit, index) => (
            <Textarea
              key={`benefit-${index + 1}`}
              onChange={(event) => updateArray("benefits", index, event.target.value)}
              value={benefit}
            />
          ))}
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold text-white">FAQ</p>
          {landing.faq.map((item, index) => (
            <div className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-3" key={`faq-${index + 1}`}>
              <Input
                onChange={(event) =>
                  updateFaq(index, "question", event.target.value)
                }
                value={item.question}
              />
              <Textarea
                onChange={(event) =>
                  updateFaq(index, "answer", event.target.value)
                }
                value={item.answer}
              />
            </div>
          ))}
        </div>

        {copyStatus ? (
          <p className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">
            {copyStatus}
          </p>
        ) : null}
      </div>
    </Panel>
  );
}

const tabItems: { label: string; value: WorkspaceTab }[] = [
  { label: "Brief", value: "brief" },
  { label: "Editor", value: "editor" },
  { label: "Marketing Kit", value: "marketing" },
];
