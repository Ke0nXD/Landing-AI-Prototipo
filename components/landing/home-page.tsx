"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  FileJson,
  Layers3,
  LockKeyhole,
  MousePointerClick,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";
import { MarketingKitGrid } from "@/components/marketing/marketing-kit-grid";
import { buttonVariants } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Reveal } from "@/components/ui/reveal";
import { sampleLanding } from "@/lib/ai/sample";
import { cn } from "@/lib/utils";

export function HomePage() {
  return (
    <main className="overflow-hidden bg-[#050914] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(168,85,247,0.13),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0),#050914_72%)]" />
      <Header />
      <section className="relative mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Gere landing pages profissionais com IA
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              AI Landing Lab transforma um briefing simples em estrutura,
              copy, paleta visual, componentes, preview editavel e marketing
              kit para campanhas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "group")}
                href="/dashboard"
              >
                Gerar minha landing page
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                className={buttonVariants({ variant: "secondary", size: "lg" })}
                href="/preview"
              >
                Ver preview editavel
              </Link>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  className="border-l border-white/10 pl-4"
                  key={stat.label}
                >
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <HeroDemo />
        </Reveal>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.035]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          {workflow.map((item, index) => (
            <Reveal delay={index * 0.08} key={item.title}>
              <div className="h-full rounded-lg border border-white/10 bg-black/20 p-5">
                <div className="mb-5 grid size-11 place-items-center rounded-lg bg-cyan-300/12 text-cyan-200">
                  <item.icon className="size-5" />
                </div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"
        id="beneficios"
      >
        <Reveal>
          <div>
            <h2 className="text-4xl font-semibold tracking-normal">
              Beneficios pensados para quem precisa sair do rascunho
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              O produto combina estratégia de landing page, copywriting,
              preview responsivo e exportação técnica para acelerar a primeira
              versao sem misturar segredos de API no navegador.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Reveal delay={index * 0.06} key={benefit.title}>
              <div className="h-full rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <benefit.icon className="mb-5 size-6 text-cyan-200" />
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-semibold tracking-normal">
                Exemplos de nichos prontos para testar
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Cada nicho recebe argumentos, secoes, objecoes e tom visual
                coerentes com o publico.
              </p>
            </div>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/dashboard"
            >
              Criar novo briefing
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {niches.map((niche, index) => (
            <Reveal delay={index * 0.05} key={niche.name}>
              <div className="group h-full rounded-lg border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.06]">
                <div className="mb-6 h-24 rounded-lg bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(168,85,247,0.1)),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.22),transparent_32%)] p-4">
                  <div className="h-full rounded-md border border-white/10 bg-black/20" />
                </div>
                <h3 className="text-lg font-semibold">{niche.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {niche.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="relative border-y border-white/10 bg-white/[0.035]"
        id="marketing"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <Reveal>
            <div>
              <h2 className="text-4xl font-semibold tracking-normal">
                Marketing Kit conectado ao preview
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                O sistema sugere posts, anuncios, mensagens de WhatsApp, bio,
                pitch e assets exportaveis para Canva ou qualquer fluxo de
                design.
              </p>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
                <Image
                  alt="Conceito visual do dashboard AI Landing Lab"
                  className="h-auto w-full"
                  height={900}
                  src="/assets/ai-landing-lab-dashboard-concept.png"
                  width={1200}
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <MarketingKitGrid kit={sampleLanding.marketingKit} />
          </Reveal>
        </div>
      </section>

      <section
        className="relative mx-auto grid max-w-7xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8"
        id="seguranca"
      >
        <Reveal>
          <Panel className="p-6">
            <LockKeyhole className="mb-5 size-7 text-cyan-200" />
            <h2 className="text-4xl font-semibold tracking-normal">
              Segurança e privacidade desde o primeiro mock
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Entradas passam por Zod e sanitizacao, a logica de IA fica em
              server actions e variaveis sensiveis ficam fora do bundle cliente.
            </p>
          </Panel>
        </Reveal>
        <div className="grid gap-4">
          {securityItems.map((item, index) => (
            <Reveal delay={index * 0.06} key={item.title}>
              <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                <CheckCircle2 className="mb-4 size-5 text-emerald-200" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-5xl rounded-lg border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(124,58,237,0.16)),rgba(255,255,255,0.06)] p-8 text-center shadow-2xl shadow-cyan-950/30">
            <h2 className="text-4xl font-semibold tracking-normal">
              Transforme seu proximo briefing em uma landing editavel
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Comece com dados mockados, arquitetura pronta para Supabase e
              integração futura com modelos Hugging Face.
            </p>
            <Link
              className={cn(buttonVariants({ size: "lg" }), "mt-8")}
              href="/dashboard"
            >
              Gerar minha landing page
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="relative z-10 border-b border-white/10 bg-[#050914]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-lg bg-cyan-300 text-slate-950">
            <Sparkles className="size-5" />
          </span>
          <span className="text-base font-semibold">AI Landing Lab</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <a className="hover:text-white" href="#beneficios">
            Beneficios
          </a>
          <a className="hover:text-white" href="#marketing">
            Marketing Kit
          </a>
          <a className="hover:text-white" href="#seguranca">
            Segurança
          </a>
        </div>
        <Link
          className={buttonVariants({ variant: "secondary", size: "sm" })}
          href="/dashboard"
        >
          Abrir dashboard
        </Link>
      </nav>
    </header>
  );
}

function HeroDemo() {
  return (
    <Panel className="relative p-4">
      <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg border border-white/10 bg-black/25 p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <Bot className="size-4" />
            Briefing ativo
          </div>
          <div className="grid gap-3">
            {[
              "Nome: Nova Clinic",
              "Nicho: healthtech premium",
              "Publico: gestores de clinicas",
              "Objetivo: agendar demo",
            ].map((item) => (
              <div
                className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-slate-300"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md bg-cyan-300 px-3 py-2 text-center text-xs font-bold text-slate-950">
            Gerar estrutura
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#071018] p-4">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-sm font-semibold">Preview gerado</span>
            <span className="text-xs text-cyan-200">desktop</span>
          </div>
          <div className="grid gap-4">
            <div>
              <div className="h-4 w-40 rounded-full bg-cyan-200/30" />
              <div className="mt-3 h-7 w-4/5 rounded-md bg-white/90" />
              <div className="mt-2 h-7 w-3/5 rounded-md bg-white/70" />
              <div className="mt-4 h-3 w-full rounded-full bg-slate-500/40" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-slate-500/30" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-3"
                  key={item}
                >
                  <div className="mb-4 size-7 rounded-md bg-cyan-300/30" />
                  <div className="h-3 rounded-full bg-white/60" />
                  <div className="mt-2 h-3 w-2/3 rounded-full bg-slate-500/40" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_0.75fr] gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
                <div className="h-4 w-1/2 rounded-full bg-violet-300/50" />
                <div className="mt-3 h-16 rounded-md bg-black/30" />
              </div>
              <div className="rounded-lg border border-emerald-200/20 bg-emerald-300/10 p-3">
                <div className="h-4 w-16 rounded-full bg-emerald-200/50" />
                <div className="mt-3 h-16 rounded-md bg-black/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

const heroStats = [
  { value: "7", label: "secoes geradas" },
  { value: "4", label: "tons visuais" },
  { value: "12+", label: "assets de campanha" },
];

const workflow = [
  {
    title: "Descreva o negocio",
    description:
      "Informe nicho, publico, oferta, tom da marca e objetivo da pagina em um briefing guiado.",
    icon: MousePointerClick,
  },
  {
    title: "Gere a estrutura",
    description:
      "A camada mockada de IA cria headline, dores, beneficios, CTAs, planos, FAQ e objecoes.",
    icon: Wand2,
  },
  {
    title: "Edite e exporte",
    description:
      "Ajuste textos, alterne preview mobile/desktop, copie conteudo e exporte o JSON da landing.",
    icon: FileJson,
  },
];

const benefits = [
  {
    title: "Arquitetura completa",
    description:
      "Hero, problemas, solucao, beneficios, prova social, planos, FAQ e CTA final saem organizados.",
    icon: Layers3,
  },
  {
    title: "Design system premium",
    description:
      "Tokens de cor, radius, sombras, estados e tons visuais foram pensados como base Figma-ready.",
    icon: Palette,
  },
  {
    title: "Mock de IA substituivel",
    description:
      "Funcoes em /lib/ai estao separadas para receber adaptadores Hugging Face sem reescrever UI.",
    icon: Bot,
  },
  {
    title: "Pronto para deploy",
    description:
      "Next.js App Router, TypeScript, Tailwind, Vercel config e env example preparados para producao.",
    icon: Boxes,
  },
];

const niches = [
  {
    name: "SaaS B2B",
    description: "Demos qualificadas, prova de ROI e objecoes de integracao.",
  },
  {
    name: "Infoprodutos",
    description: "Promessa, autoridade, transformacao e CTAs de checkout.",
  },
  {
    name: "Servicos premium",
    description: "Oferta consultiva, prova social e pitch comercial claro.",
  },
  {
    name: "Healthtech",
    description: "Seguranca, experiencia, automacao e agendamento qualificado.",
  },
];

const securityItems = [
  {
    title: "Validacao com Zod",
    description:
      "Campos tem tamanho maximo, refinamento contra padroes perigosos e sanitizacao antes da geracao.",
  },
  {
    title: "IA no servidor",
    description:
      "Server actions encapsulam a geracao e evitam expor tokens ou prompts sensiveis no bundle cliente.",
  },
  {
    title: "Sem HTML injetado",
    description:
      "O app renderiza texto com React, sem dangerouslySetInnerHTML, reduzindo risco de XSS.",
  },
  {
    title: "Supabase server-only",
    description:
      "Cliente Supabase lazy usa service role apenas no servidor e retorna null quando envs nao existem.",
  },
];
