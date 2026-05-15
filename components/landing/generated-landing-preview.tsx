import { Check, Quote, ShieldCheck } from "lucide-react";
import type { GeneratedLanding, VisualTone } from "@/types/landing";
import { cn } from "@/lib/utils";

interface GeneratedLandingPreviewProps {
  landing: GeneratedLanding;
  tone: VisualTone;
  viewport: "desktop" | "mobile";
}

const toneStyles: Record<
  VisualTone,
  {
    shell: string;
    card: string;
    accent: string;
    text: string;
    muted: string;
    button: string;
  }
> = {
  "premium-dark": {
    shell: "bg-[#071018] text-slate-50",
    card: "border-white/10 bg-white/[0.07]",
    accent: "text-cyan-200",
    text: "text-white",
    muted: "text-slate-300",
    button: "bg-cyan-300 text-slate-950",
  },
  "minimal-light": {
    shell: "bg-slate-50 text-slate-950",
    card: "border-slate-200 bg-white",
    accent: "text-blue-600",
    text: "text-slate-950",
    muted: "text-slate-600",
    button: "bg-slate-950 text-white",
  },
  "tech-neon": {
    shell: "bg-[#030712] text-cyan-50",
    card: "border-cyan-300/20 bg-cyan-300/[0.06]",
    accent: "text-emerald-200",
    text: "text-cyan-50",
    muted: "text-cyan-100/75",
    button: "bg-emerald-300 text-slate-950",
  },
  "corporate-elegant": {
    shell: "bg-[#08111f] text-slate-50",
    card: "border-sky-200/15 bg-slate-900/70",
    accent: "text-sky-200",
    text: "text-white",
    muted: "text-slate-300",
    button: "bg-sky-300 text-slate-950",
  },
};

export function GeneratedLandingPreview({
  landing,
  tone,
  viewport,
}: GeneratedLandingPreviewProps) {
  const styles = toneStyles[tone];
  const isMobile = viewport === "mobile";

  return (
    <div
      className={cn(
        "mx-auto overflow-hidden rounded-lg border border-white/10 shadow-2xl shadow-black/40 transition-all duration-300",
        isMobile ? "max-w-[375px]" : "max-w-5xl",
      )}
    >
      <div className={cn("relative", styles.shell)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_25%)]" />
        <div className="relative">
          <header
            className={cn(
              "flex items-center justify-between border-b px-5 py-4",
              tone === "minimal-light" ? "border-slate-200" : "border-white/10",
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn("size-8 rounded-lg", styles.button)} />
              <span className={cn("font-semibold", styles.text)}>
                {landing.input.businessName}
              </span>
            </div>
            {!isMobile ? (
              <nav className={cn("flex gap-5 text-xs", styles.muted)}>
                <span>Solucao</span>
                <span>Prova</span>
                <span>Planos</span>
              </nav>
            ) : null}
          </header>

          <main className={cn("grid gap-10 p-5", !isMobile && "p-8")}>
            <section
              className={cn(
                "grid gap-6",
                !isMobile && "grid-cols-[1.05fr_0.95fr] items-center",
              )}
            >
              <div>
                <p className={cn("text-sm font-semibold", styles.accent)}>
                  Landing gerada para {landing.input.niche}
                </p>
                <h1
                  className={cn(
                    "mt-4 font-semibold leading-tight tracking-normal",
                    isMobile ? "text-3xl" : "text-5xl",
                    styles.text,
                  )}
                >
                  {landing.headline}
                </h1>
                <p
                  className={cn(
                    "mt-4 leading-7",
                    isMobile ? "text-sm" : "text-base",
                    styles.muted,
                  )}
                >
                  {landing.subheadline}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className={cn(
                      "rounded-full px-5 py-3 text-sm font-semibold",
                      styles.button,
                    )}
                    type="button"
                  >
                    {landing.ctas.primary}
                  </button>
                  <button
                    className={cn(
                      "rounded-full border px-5 py-3 text-sm font-semibold",
                      tone === "minimal-light"
                        ? "border-slate-300 text-slate-900"
                        : "border-white/15 text-white",
                    )}
                    type="button"
                  >
                    {landing.ctas.secondary}
                  </button>
                </div>
              </div>

              <div className={cn("rounded-lg border p-4", styles.card)}>
                <div className="grid gap-3">
                  {landing.structure.slice(0, 5).map((section, index) => (
                    <div
                      className={cn(
                        "flex items-start gap-3 rounded-lg p-3",
                        tone === "minimal-light"
                          ? "bg-slate-50"
                          : "bg-black/20",
                      )}
                      key={section.id}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                          styles.button,
                        )}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className={cn("text-sm font-semibold", styles.text)}>
                          {section.label}
                        </p>
                        <p className={cn("mt-1 text-xs leading-5", styles.muted)}>
                          {section.purpose}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              className={cn(
                "grid gap-3",
                !isMobile && "grid-cols-2 lg:grid-cols-4",
              )}
            >
              {landing.benefits.map((benefit) => (
                <div className={cn("rounded-lg border p-4", styles.card)} key={benefit}>
                  <Check className={cn("mb-4 size-5", styles.accent)} />
                  <p className={cn("text-sm leading-6", styles.muted)}>
                    {benefit}
                  </p>
                </div>
              ))}
            </section>

            <section
              className={cn(
                "grid gap-4",
                !isMobile && "grid-cols-[0.85fr_1.15fr] items-start",
              )}
            >
              <div>
                <h2 className={cn("text-2xl font-semibold", styles.text)}>
                  De dor dispersa para pagina que convence
                </h2>
                <div className="mt-4 grid gap-3">
                  {landing.pains.map((pain) => (
                    <p
                      className={cn("rounded-lg border p-3 text-sm", styles.card)}
                      key={pain}
                    >
                      {pain}
                    </p>
                  ))}
                </div>
              </div>
              <div className={cn("rounded-lg border p-5", styles.card)}>
                <ShieldCheck className={cn("mb-4 size-6", styles.accent)} />
                <h3 className={cn("text-xl font-semibold", styles.text)}>
                  Solucao proposta
                </h3>
                <div className="mt-4 grid gap-3">
                  {landing.solution.map((step) => (
                    <p className={cn("text-sm leading-6", styles.muted)} key={step}>
                      {step}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section
              className={cn("grid gap-4", !isMobile && "grid-cols-3")}
            >
              {landing.plans.map((plan) => (
                <div
                  className={cn(
                    "rounded-lg border p-5",
                    styles.card,
                    plan.highlighted &&
                      "ring-2 ring-cyan-300/40 shadow-[0_0_35px_rgba(34,211,238,0.15)]",
                  )}
                  key={plan.name}
                >
                  <p className={cn("text-sm font-semibold", styles.accent)}>
                    {plan.name}
                  </p>
                  <p className={cn("mt-3 text-3xl font-semibold", styles.text)}>
                    {plan.price}
                  </p>
                  <p className={cn("mt-2 text-sm leading-6", styles.muted)}>
                    {plan.description}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {plan.features.map((feature) => (
                      <li
                        className={cn("flex items-center gap-2 text-sm", styles.muted)}
                        key={feature}
                      >
                        <Check className={cn("size-4", styles.accent)} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section
              className={cn(
                "grid gap-4",
                !isMobile && "grid-cols-[0.8fr_1.2fr]",
              )}
            >
              <div className={cn("rounded-lg border p-5", styles.card)}>
                <Quote className={cn("mb-4 size-6", styles.accent)} />
                <p className={cn("text-lg leading-8", styles.text)}>
                  {landing.socialProof[0]?.quote}
                </p>
                <p className={cn("mt-4 text-sm", styles.muted)}>
                  {landing.socialProof[0]?.author}, {landing.socialProof[0]?.role}
                </p>
                <p className={cn("mt-2 text-sm font-semibold", styles.accent)}>
                  {landing.socialProof[0]?.metric}
                </p>
              </div>
              <div className="grid gap-3">
                {landing.faq.map((item) => (
                  <div className={cn("rounded-lg border p-4", styles.card)} key={item.question}>
                    <h3 className={cn("text-sm font-semibold", styles.text)}>
                      {item.question}
                    </h3>
                    <p className={cn("mt-2 text-sm leading-6", styles.muted)}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className={cn("rounded-lg border p-6 text-center", styles.card)}>
              <h2 className={cn("text-3xl font-semibold", styles.text)}>
                Pronto para publicar uma pagina mais clara?
              </h2>
              <p className={cn("mx-auto mt-3 max-w-2xl text-sm leading-6", styles.muted)}>
                Use esta estrutura como briefing de design, base de desenvolvimento
                ou ponto de partida para campanhas.
              </p>
              <button
                className={cn("mt-5 rounded-full px-5 py-3 text-sm font-semibold", styles.button)}
                type="button"
              >
                {landing.ctas.primary}
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
