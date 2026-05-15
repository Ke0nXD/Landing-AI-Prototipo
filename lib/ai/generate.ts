import "server-only";

import type {
  GeneratedLanding,
  LandingDesignSystem,
  LandingInput,
  LandingStructureItem,
  MarketingKit,
  ObjectionResponse,
} from "@/types/landing";
import { createStableId, toSentenceCase } from "@/lib/utils";

const toneLabels: Record<LandingInput["visualTone"], string> = {
  "premium-dark": "premium dark",
  "minimal-light": "minimalista claro",
  "tech-neon": "tech neon",
  "corporate-elegant": "elegante corporativo",
};

export function generateHeadline(input: LandingInput) {
  return `${toSentenceCase(input.businessName)} transforma ${input.niche} em uma pagina que vende antes da primeira reuniao`;
}

export function generateSubheadline(input: LandingInput) {
  return `Uma landing page pensada para ${input.audience}, com copy clara, prova de valor e um caminho direto para ${input.pageGoal.toLowerCase()}.`;
}

export function generateBenefits(input: LandingInput) {
  return [
    `Comunica a oferta "${input.offer}" com uma narrativa simples de entender e facil de compartilhar.`,
    `Organiza beneficios, dores e prova social para reduzir friccao de decisao do publico ${input.audience}.`,
    `Cria uma estrutura visual ${toneLabels[input.visualTone]} pronta para iterar com marketing, vendas e produto.`,
    `Entrega CTAs consistentes para transformar interesse em uma proxima acao mensuravel.`,
  ];
}

export function generatePainPoints(input: LandingInput) {
  return [
    `${toSentenceCase(input.audience)} ainda precisa entender rapidamente por que a solucao e diferente.`,
    `A oferta pode perder conversoes quando beneficios, provas e objeções ficam espalhados.`,
    `Campanhas pagas ficam mais caras quando a pagina nao sustenta a promessa do anuncio.`,
  ];
}

export function generateCtas(input: LandingInput) {
  const goal = input.pageGoal.toLowerCase();

  return {
    primary: goal.includes("demo") ? "Agendar demo" : "Quero comecar agora",
    secondary: "Ver estrutura da pagina",
  };
}

export function generateLandingStructure(input: LandingInput): LandingStructureItem[] {
  return [
    {
      id: "hero",
      label: "Hero",
      purpose: `Apresentar ${input.businessName} e a promessa principal em ate 8 segundos.`,
    },
    {
      id: "pains",
      label: "Dores do publico",
      purpose: "Mostrar que a marca entende o contexto e as barreiras de compra.",
    },
    {
      id: "solution",
      label: "Solucao",
      purpose: `Explicar como a oferta "${input.offer}" cria progresso real.`,
    },
    {
      id: "benefits",
      label: "Beneficios",
      purpose: "Transformar recursos em ganhos praticos e mensuraveis.",
    },
    {
      id: "proof",
      label: "Prova social",
      purpose: "Diminuir risco percebido com evidencias, relatos e numeros.",
    },
    {
      id: "pricing",
      label: "Planos",
      purpose: "Dar um proximo passo claro para diferentes niveis de maturidade.",
    },
    {
      id: "faq",
      label: "FAQ",
      purpose: "Responder objecoes antes do contato comercial.",
    },
  ];
}

export function generateObjectionsAndResponses(
  input: LandingInput,
): ObjectionResponse[] {
  return [
    {
      objection: "Nao sei se isso serve para o meu momento.",
      response: `A pagina pode priorizar ${input.pageGoal.toLowerCase()} e adaptar a profundidade da oferta para leads frios, mornos ou prontos para comprar.`,
    },
    {
      objection: "Ja tenho uma pagina no ar.",
      response:
        "A nova estrutura pode ser usada como teste A/B, campanha dedicada ou versao mais focada para uma oferta especifica.",
    },
    {
      objection: "Tenho pouco material de marca.",
      response:
        "O gerador parte do briefing e cria uma base coerente de tom, secoes, CTAs e marketing kit para acelerar a primeira versao.",
    },
  ];
}

function generateSolution(input: LandingInput) {
  return [
    `Diagnostico rapido do posicionamento para conectar ${input.niche} com uma promessa comercial objetiva.`,
    "Arquitetura de secoes com hierarquia de mensagem, prova e chamada para acao.",
    "Preview editavel para ajustar tom, CTA, beneficios, FAQ e materiais de campanha.",
  ];
}

function generateMarketingKit(input: LandingInput): MarketingKit {
  return {
    instagramPosts: [
      `Carrossel: 5 sinais de que sua pagina de ${input.niche} esta perdendo leads qualificados.`,
      `Post prova: antes e depois de uma landing com foco em ${input.pageGoal.toLowerCase()}.`,
      `Reel curto: como explicar "${input.offer}" em 20 segundos sem parecer generico.`,
      `Checklist: elementos que ${input.audience} procura antes de confiar em uma oferta.`,
      `Bastidores: do briefing ao primeiro preview de landing em poucos minutos.`,
    ],
    adHooks: [
      `Sua oferta de ${input.niche} merece uma pagina que vende antes do formulario.`,
      `Transforme um briefing simples em copy, secoes e CTAs prontos para campanha.`,
      `Pare de mandar trafego para uma pagina que nao conversa com ${input.audience}.`,
    ],
    whatsappMessages: [
      `Oi! Montei uma estrutura de landing para ${input.businessName} focada em ${input.pageGoal.toLowerCase()}. Quer ver o preview?`,
      `Tenho uma versao com headline, beneficios, FAQ e CTAs para vender "${input.offer}" com mais clareza.`,
      `Se fizer sentido, posso te mostrar como a pagina ficaria em tom ${input.brandTone.toLowerCase()} e ja com ideias de posts.`,
    ],
    bio: `${input.businessName}: ${input.offer} para ${input.audience}.`,
    pitch: `${input.businessName} ajuda ${input.audience} a avancar em ${input.niche} com uma oferta clara, confiavel e pronta para conversao.`,
    assetSuggestions: {
      coverImage: `Capa hero com mockup da pagina, promessa principal e CTA "${generateCtas(input).primary}".`,
      promotionalMockup:
        "Mockup em notebook e celular mostrando hero, beneficios e prova social.",
      socialBanner: `Banner 1080x1350 com a dor central de ${input.audience} e uma chamada curta.`,
      thumbnail: `Thumbnail compacta com headline, paleta ${toneLabels[input.visualTone]} e selo de preview editavel.`,
    },
  };
}

function generateDesignSystem(input: LandingInput): LandingDesignSystem {
  const palettes: Record<LandingInput["visualTone"], LandingDesignSystem["palette"]> = {
    "premium-dark": {
      background: "#071018",
      surface: "#111827",
      accent: "#7c3aed",
      secondaryAccent: "#22d3ee",
      text: "#f8fafc",
    },
    "minimal-light": {
      background: "#f8fafc",
      surface: "#ffffff",
      accent: "#2563eb",
      secondaryAccent: "#14b8a6",
      text: "#0f172a",
    },
    "tech-neon": {
      background: "#030712",
      surface: "#07111f",
      accent: "#00f5d4",
      secondaryAccent: "#a855f7",
      text: "#ecfeff",
    },
    "corporate-elegant": {
      background: "#08111f",
      surface: "#111827",
      accent: "#38bdf8",
      secondaryAccent: "#10b981",
      text: "#f8fafc",
    },
  };

  return {
    tone: input.visualTone,
    palette: palettes[input.visualTone],
    components: [
      "Hero com prova de valor",
      "Cards glass com borda discreta",
      "Blocos de beneficio editaveis",
      "FAQ comercial",
      "CTA final de alta clareza",
    ],
    motion: [
      "Entrada suave por scroll",
      "Hover com elevacao curta",
      "Transicoes de preview entre desktop e mobile",
    ],
  };
}

export async function generateLandingBlueprint(
  input: LandingInput,
): Promise<GeneratedLanding> {
  const ctas = generateCtas(input);

  return {
    id: createStableId("landing", `${input.businessName}-${input.niche}`),
    createdAt: new Date().toISOString(),
    input,
    headline: generateHeadline(input),
    subheadline: generateSubheadline(input),
    benefits: generateBenefits(input),
    pains: generatePainPoints(input),
    solution: generateSolution(input),
    ctas,
    socialProof: [
      {
        quote: `A nova pagina deixou a proposta de ${input.niche} muito mais facil de vender.`,
        author: "Marina Costa",
        role: "Head de Growth",
        metric: "+38% em leads qualificados",
      },
      {
        quote: "O time finalmente tinha copy, secoes e argumentos em uma unica narrativa.",
        author: "Rafael Lima",
        role: "Founder B2B",
        metric: "2 semanas economizadas",
      },
    ],
    plans: [
      {
        name: "Start",
        price: "R$ 490",
        description: "Landing enxuta para validar uma oferta.",
        features: ["Hero e beneficios", "FAQ essencial", "1 tom visual"],
      },
      {
        name: "Growth",
        price: "R$ 1.490",
        description: "Pagina completa para campanhas e vendas consultivas.",
        features: ["Copy completa", "Marketing kit", "Preview responsivo"],
        highlighted: true,
      },
      {
        name: "Scale",
        price: "Sob consulta",
        description: "Sistema de paginas e variacoes por campanha.",
        features: ["Multiplas ofertas", "Testes A/B", "Integracao CRM"],
      },
    ],
    faq: [
      {
        question: "Posso editar os textos depois?",
        answer:
          "Sim. O preview nasce editavel para ajustar headline, beneficios, CTAs, FAQ e tom da marca.",
      },
      {
        question: "A pagina ja sai pronta para desenvolvimento?",
        answer:
          "Ela sai com estrutura, copy, paleta, secoes e JSON exportavel para acelerar design e implementacao.",
      },
      {
        question: "Como ficam privacidade e dados?",
        answer:
          "Os dados do briefing sao validados no servidor e nenhuma chave de IA ou banco e enviada ao navegador.",
      },
    ],
    structure: generateLandingStructure(input),
    objections: generateObjectionsAndResponses(input),
    marketingKit: generateMarketingKit(input),
    designSystem: generateDesignSystem(input),
  };
}
