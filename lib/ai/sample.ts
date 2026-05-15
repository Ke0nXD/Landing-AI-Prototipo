import type { GeneratedLanding } from "@/types/landing";

export const sampleLanding: GeneratedLanding = {
  id: "landing-nova-clinic-healthtech",
  createdAt: "2026-05-15T12:00:00.000Z",
  input: {
    sourcePrompt:
      "Crie uma landing page para a Nova Clinic, uma healthtech para clinicas premium. O publico-alvo sao gestores de clinicas que precisam aumentar agendamentos qualificados. A oferta principal e uma agenda inteligente com automacao de follow-up. O objetivo e agendar uma demonstracao comercial com tom consultivo e premium.",
    aiProvider: "mock",
    aiModel: "mock-local",
    businessName: "Nova Clinic",
    niche: "healthtech para clinicas premium",
    audience: "gestores de clinicas que precisam aumentar agendamentos qualificados",
    offer: "implantacao de agenda inteligente com automacao de follow-up",
    brandTone: "consultivo e premium",
    pageGoal: "agendar uma demonstracao comercial",
    visualTone: "premium-dark",
  },
  headline:
    "Nova Clinic transforma agendamentos em uma experiencia premium e previsivel",
  subheadline:
    "Uma landing page com copy consultiva, prova de valor e um caminho direto para clinicas que querem agendar mais pacientes certos.",
  benefits: [
    "Mostre a oferta de agenda inteligente com uma narrativa simples para decisores ocupados.",
    "Conecte dores de ocupacao, experiencia do paciente e previsibilidade comercial.",
    "Destaque automacoes de follow-up sem parecer tecnico demais.",
    "Use CTAs claros para transformar interesse em reunioes qualificadas.",
  ],
  pains: [
    "Leads chegam pelo WhatsApp, mas se perdem antes do primeiro atendimento.",
    "A clinica investe em trafego, mas a pagina nao sustenta a promessa do anuncio.",
    "O time comercial precisa explicar a mesma proposta toda semana.",
  ],
  solution: [
    "Hero com promessa comercial e prova rapida de valor.",
    "Blocos de beneficios que conectam operacao, receita e experiencia.",
    "FAQ que responde objecoes de integracao, tempo e seguranca.",
  ],
  ctas: {
    primary: "Agendar demo",
    secondary: "Ver estrutura da pagina",
  },
  socialProof: [
    {
      quote:
        "A nova pagina deixou nossa proposta clara para gestores que antes chegavam cheios de duvidas.",
      author: "Carolina Mendes",
      role: "Diretora Comercial",
      metric: "+42% demos qualificadas",
    },
    {
      quote:
        "O marketing kit nos deu anuncios, posts e mensagens para testar no mesmo dia.",
      author: "Luis Navarro",
      role: "Growth Lead",
      metric: "7 campanhas ativadas",
    },
  ],
  plans: [
    {
      name: "Start",
      price: "R$ 490",
      description: "Landing enxuta para validar uma campanha.",
      features: ["Hero", "Beneficios", "FAQ essencial"],
    },
    {
      name: "Growth",
      price: "R$ 1.490",
      description: "Pagina completa para captacao e vendas.",
      features: ["Copy completa", "Marketing kit", "JSON exportavel"],
      highlighted: true,
    },
    {
      name: "Scale",
      price: "Sob consulta",
      description: "Variacoes de pagina por publico e oferta.",
      features: ["Multiplos nichos", "Teste de tons", "Roadmap CRM"],
    },
  ],
  faq: [
    {
      question: "Consigo adaptar a pagina para outra especialidade?",
      answer:
        "Sim. O briefing pode gerar variacoes por publico, oferta e tom visual.",
    },
    {
      question: "O conteudo fica preso a uma ferramenta?",
      answer:
        "Nao. O JSON exportavel facilita levar a estrutura para design, CMS ou desenvolvimento.",
    },
    {
      question: "Os dados do briefing ficam seguros?",
      answer:
        "As entradas sao validadas e a logica de IA fica no servidor, sem expor chaves no cliente.",
    },
  ],
  structure: [
    {
      id: "hero",
      label: "Hero",
      purpose: "Promessa principal, subheadline e CTA de demo.",
    },
    {
      id: "pains",
      label: "Dores",
      purpose: "Mostrar problemas de captacao e agenda.",
    },
    {
      id: "solution",
      label: "Solucao",
      purpose: "Explicar o mecanismo da oferta.",
    },
    {
      id: "pricing",
      label: "Planos",
      purpose: "Organizar proximos passos por maturidade.",
    },
  ],
  objections: [
    {
      objection: "Minha clinica ja tem site.",
      response:
        "A landing pode ser uma pagina dedicada para campanha, oferta ou publico especifico.",
    },
    {
      objection: "Nao quero expor dados sensiveis.",
      response:
        "O briefing usa informacoes comerciais e evita dados pessoais ou prontuarios.",
    },
  ],
  marketingKit: {
    instagramPosts: [
      "Carrossel: por que bons leads somem antes da primeira consulta.",
      "Reel: 3 ajustes para transformar trafego em agendamento qualificado.",
      "Post prova: antes e depois de uma pagina com CTA de demo.",
      "Checklist: o que gestores de clinica procuram antes de conversar.",
      "Bastidores: como sair do briefing para uma landing em minutos.",
    ],
    adHooks: [
      "Sua clinica precisa de mais agendamentos qualificados, nao so mais cliques.",
      "Transforme campanhas em demos com uma pagina clara e premium.",
      "Pare de explicar sua oferta do zero em todo WhatsApp.",
    ],
    whatsappMessages: [
      "Oi! Montei uma estrutura de landing para aumentar demos qualificadas da Nova Clinic. Quer ver o preview?",
      "Tenho uma versao com headline, beneficios, FAQ e CTAs prontos para campanha.",
      "Posso te mostrar como ficaria em tom consultivo e premium, ja com ideias de posts.",
    ],
    bio: "Nova Clinic: agenda inteligente para clinicas premium venderem com previsibilidade.",
    pitch:
      "A Nova Clinic ajuda gestores de clinicas a transformar interesse em agendamentos qualificados com uma experiencia comercial clara, segura e automatizada.",
    assetSuggestions: {
      coverImage: "Capa hero com mockup responsivo e promessa de agendamento.",
      promotionalMockup: "Notebook e celular mostrando hero, beneficios e FAQ.",
      socialBanner: "Banner 1080x1350 com a dor central do lead perdido.",
      thumbnail: "Thumbnail compacta com CTA de demo e visual premium dark.",
    },
  },
  designSystem: {
    tone: "premium-dark",
    palette: {
      background: "#071018",
      surface: "#111827",
      accent: "#7c3aed",
      secondaryAccent: "#22d3ee",
      text: "#f8fafc",
    },
    components: [
      "Hero premium",
      "Cards glass",
      "FAQ editavel",
      "Marketing kit",
    ],
    motion: ["Reveal por scroll", "Hover suave", "Preview responsivo"],
  },
};
