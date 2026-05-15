import "server-only";

import { z } from "zod";
import type {
  GeneratedLanding,
  LandingDesignSystem,
  LandingInput,
  LandingPromptInput,
  LandingStructureItem,
  MarketingKit,
  ObjectionResponse,
  PricingPlan,
  SocialProof,
} from "@/types/landing";
import { createStableId, toSentenceCase } from "@/lib/utils";
import { sanitizeTextInput } from "@/lib/validators/sanitize";

const DEFAULT_CLAUDE_MODEL = "claude-sonnet-4-5-20250929";
const ANTHROPIC_VERSION = "2023-06-01";

const toneLabels: Record<LandingInput["visualTone"], string> = {
  "premium-dark": "premium dark",
  "minimal-light": "minimalista claro",
  "tech-neon": "tech neon",
  "corporate-elegant": "elegante corporativo",
};

const aiLandingDraftSchema = z.object({
  businessName: z.string().optional(),
  niche: z.string().optional(),
  audience: z.string().optional(),
  offer: z.string().optional(),
  brandTone: z.string().optional(),
  pageGoal: z.string().optional(),
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  pains: z.array(z.string()).optional(),
  solution: z.array(z.string()).optional(),
  ctas: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
    })
    .optional(),
  socialProof: z
    .array(
      z.object({
        quote: z.string().optional(),
        author: z.string().optional(),
        role: z.string().optional(),
        metric: z.string().optional(),
      }),
    )
    .optional(),
  plans: z
    .array(
      z.object({
        name: z.string().optional(),
        price: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        highlighted: z.boolean().optional(),
      }),
    )
    .optional(),
  faq: z
    .array(
      z.object({
        question: z.string().optional(),
        answer: z.string().optional(),
      }),
    )
    .optional(),
  structure: z
    .array(
      z.object({
        id: z.string().optional(),
        label: z.string().optional(),
        purpose: z.string().optional(),
      }),
    )
    .optional(),
  objections: z
    .array(
      z.object({
        objection: z.string().optional(),
        response: z.string().optional(),
      }),
    )
    .optional(),
  marketingKit: z
    .object({
      instagramPosts: z.array(z.string()).optional(),
      adHooks: z.array(z.string()).optional(),
      whatsappMessages: z.array(z.string()).optional(),
      bio: z.string().optional(),
      pitch: z.string().optional(),
      assetSuggestions: z
        .object({
          coverImage: z.string().optional(),
          promotionalMockup: z.string().optional(),
          socialBanner: z.string().optional(),
          thumbnail: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

type AiLandingDraft = z.infer<typeof aiLandingDraftSchema>;

export async function generateLandingFromPrompt(
  request: LandingPromptInput,
): Promise<GeneratedLanding> {
  if (request.provider === "anthropic") {
    return generateWithAnthropic(request);
  }

  return generateMockLandingFromPrompt(request);
}

export async function generateMockLandingFromPrompt(
  request: LandingPromptInput,
): Promise<GeneratedLanding> {
  const input = deriveLandingInput(request);
  return generateLandingBlueprint(input);
}

async function generateWithAnthropic(
  request: LandingPromptInput,
): Promise<GeneratedLanding> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const model =
    request.model?.trim() ||
    process.env.ANTHROPIC_MODEL?.trim() ||
    DEFAULT_CLAUDE_MODEL;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model,
      max_tokens: 3500,
      system: buildClaudeSystemPrompt(request.visualTone),
      messages: [
        {
          role: "user",
          content: request.prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as AnthropicMessagesResponse;
  const text = payload.content
    ?.filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Anthropic response did not include text content.");
  }

  const draft = parseAiDraft(text);
  return composeLandingFromDraft(request, model, draft);
}

function buildClaudeSystemPrompt(visualTone: LandingPromptInput["visualTone"]) {
  return `Voce e um estrategista senior de SaaS, copywriter de conversao e designer de landing pages.
Gere uma landing page profissional em portugues do Brasil a partir do prompt do usuario.

Regras obrigatorias:
- Responda somente com JSON valido, sem markdown, sem comentarios e sem texto fora do JSON.
- Nao use HTML. Todos os campos devem ser texto puro.
- Seja especifico ao negocio descrito pelo usuario; nao gere copy generica.
- Preserve seguranca: nao inclua scripts, tags, links suspeitos, segredos, chaves ou instrucoes perigosas.
- Tom visual solicitado: ${visualTone}.

Formato JSON:
{
  "businessName": "nome do negocio",
  "niche": "nicho",
  "audience": "publico-alvo",
  "offer": "oferta principal",
  "brandTone": "tom de marca",
  "pageGoal": "objetivo da pagina",
  "headline": "headline forte",
  "subheadline": "subheadline clara",
  "benefits": ["4 beneficios"],
  "pains": ["3 dores do publico"],
  "solution": ["3 blocos de solucao"],
  "ctas": { "primary": "CTA principal", "secondary": "CTA secundario" },
  "socialProof": [{ "quote": "depoimento", "author": "nome", "role": "cargo", "metric": "metrica" }],
  "plans": [{ "name": "plano", "price": "preco", "description": "descricao", "features": ["3 recursos"], "highlighted": true }],
  "faq": [{ "question": "pergunta", "answer": "resposta" }],
  "structure": [{ "id": "hero", "label": "Hero", "purpose": "objetivo da secao" }],
  "objections": [{ "objection": "objecao", "response": "resposta" }],
  "marketingKit": {
    "instagramPosts": ["5 ideias"],
    "adHooks": ["3 chamadas"],
    "whatsappMessages": ["3 mensagens"],
    "bio": "bio curta",
    "pitch": "pitch comercial",
    "assetSuggestions": {
      "coverImage": "direcao para capa",
      "promotionalMockup": "direcao para mockup",
      "socialBanner": "direcao para banner",
      "thumbnail": "direcao para thumbnail"
    }
  }
}`;
}

function parseAiDraft(text: string): AiLandingDraft {
  const jsonText = extractJsonObject(text);
  const parsed = JSON.parse(jsonText) as unknown;
  return aiLandingDraftSchema.parse(parsed);
}

function extractJsonObject(text: string) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("AI response did not contain a JSON object.");
  }

  return text.slice(firstBrace, lastBrace + 1);
}

function composeLandingFromDraft(
  request: LandingPromptInput,
  model: string,
  draft: AiLandingDraft,
): GeneratedLanding {
  const fallbackInput = deriveLandingInput({
    ...request,
    model,
  });

  const input: LandingInput = {
    ...fallbackInput,
    aiModel: model,
    businessName: textOr(draft.businessName, fallbackInput.businessName),
    niche: textOr(draft.niche, fallbackInput.niche),
    audience: textOr(draft.audience, fallbackInput.audience),
    offer: textOr(draft.offer, fallbackInput.offer),
    brandTone: textOr(draft.brandTone, fallbackInput.brandTone),
    pageGoal: textOr(draft.pageGoal, fallbackInput.pageGoal),
  };

  const fallback = generateLandingBlueprintSync(input);
  const ctas = {
    primary: textOr(draft.ctas?.primary, fallback.ctas.primary),
    secondary: textOr(draft.ctas?.secondary, fallback.ctas.secondary),
  };

  return {
    ...fallback,
    input,
    headline: textOr(draft.headline, fallback.headline),
    subheadline: textOr(draft.subheadline, fallback.subheadline),
    benefits: listOr(draft.benefits, fallback.benefits, 4),
    pains: listOr(draft.pains, fallback.pains, 3),
    solution: listOr(draft.solution, fallback.solution, 3),
    ctas,
    socialProof: socialProofOr(draft.socialProof, fallback.socialProof),
    plans: plansOr(draft.plans, fallback.plans),
    faq: faqOr(draft.faq, fallback.faq),
    structure: structureOr(draft.structure, fallback.structure),
    objections: objectionsOr(draft.objections, fallback.objections),
    marketingKit: marketingKitOr(draft.marketingKit, fallback.marketingKit),
  };
}

function deriveLandingInput(request: LandingPromptInput): LandingInput {
  const prompt = sanitizeTextInput(request.prompt);
  const firstLine = prompt.split(/[.\n]/)[0]?.trim() || prompt;
  const businessName =
    cleanBusinessName(
      matchPrompt(
        prompt,
        /(?:nome|marca|empresa|negocio|startup)\s*(?:e|eh|:|-)\s*([A-Za-z0-9\s&-]{2,60})/i,
      ) ||
        matchPrompt(
          prompt,
          /(?:chamado|chamada|called)\s+([A-Za-z0-9\s&-]{2,60})/i,
        ),
    ) ||
    firstLine.split(/\s+/).slice(0, 3).join(" ");
  const niche =
    matchPrompt(prompt, /(?:nicho|mercado|segmento)\s*(?:e|eh|:|-)\s*([^.\n]{3,90})/i) ||
    "negocio digital";
  const audience =
    matchPrompt(prompt, /(?:publico|cliente|persona)\s*(?:e|eh|:|-)?\s*([^.\n]{8,160})/i) ||
    "clientes que procuram uma solucao clara e confiavel";
  const offer =
    matchPrompt(prompt, /(?:oferta|produto|servico|vende|vender)\s*(?:e|eh|:|-)?\s*([^.\n]{8,180})/i) ||
    "uma oferta principal com alto valor percebido";
  const pageGoal =
    matchPrompt(prompt, /(?:objetivo|meta|conversao)\s*(?:e|eh|:|-)\s*([^.\n]{6,160})/i) ||
    "gerar leads qualificados";

  return {
    sourcePrompt: prompt,
    aiProvider: request.provider,
    aiModel: request.model?.trim() || undefined,
    businessName: textOr(businessName, "Landing AI"),
    niche: textOr(niche, "negocio digital"),
    audience: textOr(audience, "clientes qualificados"),
    offer: textOr(offer, "uma oferta principal"),
    brandTone: "consultivo e premium",
    pageGoal: textOr(pageGoal, "gerar leads qualificados"),
    visualTone: request.visualTone,
  };
}

function matchPrompt(prompt: string, regex: RegExp) {
  const match = prompt.match(regex)?.[1];
  return match ? sanitizeTextInput(match).slice(0, 180) : undefined;
}

function cleanBusinessName(value?: string) {
  return value?.split(/[.,;:\n]/)[0]?.trim();
}

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
    "Entrega CTAs consistentes para transformar interesse em uma proxima acao mensuravel.",
  ];
}

export function generatePainPoints(input: LandingInput) {
  return [
    `${toSentenceCase(input.audience)} ainda precisa entender rapidamente por que a solucao e diferente.`,
    "A oferta pode perder conversoes quando beneficios, provas e objecoes ficam espalhados.",
    "Campanhas pagas ficam mais caras quando a pagina nao sustenta a promessa do anuncio.",
  ];
}

export function generateCtas(input: LandingInput) {
  const goal = input.pageGoal.toLowerCase();

  return {
    primary: goal.includes("demo") ? "Agendar demo" : "Quero comecar agora",
    secondary: "Ver estrutura da pagina",
  };
}

export function generateLandingStructure(
  input: LandingInput,
): LandingStructureItem[] {
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
        "O gerador parte do prompt e cria uma base coerente de tom, secoes, CTAs e marketing kit para acelerar a primeira versao.",
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
      "Bastidores: do prompt ao primeiro preview de landing em poucos minutos.",
    ],
    adHooks: [
      `Sua oferta de ${input.niche} merece uma pagina que vende antes do formulario.`,
      "Transforme um prompt simples em copy, secoes e CTAs prontos para campanha.",
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
  const palettes: Record<
    LandingInput["visualTone"],
    LandingDesignSystem["palette"]
  > = {
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
  return generateLandingBlueprintSync(input);
}

function generateLandingBlueprintSync(input: LandingInput): GeneratedLanding {
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
          "Os dados do prompt sao validados no servidor e nenhuma chave de IA ou banco e enviada ao navegador.",
      },
    ],
    structure: generateLandingStructure(input),
    objections: generateObjectionsAndResponses(input),
    marketingKit: generateMarketingKit(input),
    designSystem: generateDesignSystem(input),
  };
}

function textOr(value: unknown, fallback: string, max = 260) {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = sanitizeTextInput(value).slice(0, max);
  return cleaned || fallback;
}

function listOr(values: unknown, fallback: string[], expectedLength: number) {
  if (!Array.isArray(values)) {
    return fallback;
  }

  const cleaned = values
    .filter((value): value is string => typeof value === "string")
    .map((value) => textOr(value, "", 420))
    .filter(Boolean)
    .slice(0, Math.max(expectedLength, 1));

  return cleaned.length ? cleaned : fallback;
}

function socialProofOr(
  values: AiLandingDraft["socialProof"],
  fallback: SocialProof[],
) {
  if (!values?.length) {
    return fallback;
  }

  return values.slice(0, 3).map((item, index) => ({
    quote: textOr(item.quote, fallback[index]?.quote || fallback[0].quote, 420),
    author: textOr(item.author, fallback[index]?.author || "Cliente"),
    role: textOr(item.role, fallback[index]?.role || "Founder"),
    metric: textOr(item.metric, fallback[index]?.metric || "+30% conversao"),
  }));
}

function plansOr(values: AiLandingDraft["plans"], fallback: PricingPlan[]) {
  if (!values?.length) {
    return fallback;
  }

  return values.slice(0, 4).map((item, index) => ({
    name: textOr(item.name, fallback[index]?.name || "Plano"),
    price: textOr(item.price, fallback[index]?.price || "Sob consulta"),
    description: textOr(
      item.description,
      fallback[index]?.description || "Plano para validar a oferta.",
      260,
    ),
    features: listOr(item.features, fallback[index]?.features || [], 4),
    highlighted: Boolean(item.highlighted),
  }));
}

function faqOr(values: AiLandingDraft["faq"], fallback: GeneratedLanding["faq"]) {
  if (!values?.length) {
    return fallback;
  }

  return values.slice(0, 6).map((item, index) => ({
    question: textOr(
      item.question,
      fallback[index]?.question || "Como isso funciona?",
      180,
    ),
    answer: textOr(
      item.answer,
      fallback[index]?.answer || "A pagina pode ser editada antes de publicar.",
      420,
    ),
  }));
}

function structureOr(
  values: AiLandingDraft["structure"],
  fallback: LandingStructureItem[],
) {
  if (!values?.length) {
    return fallback;
  }

  return values.slice(0, 9).map((item, index) => ({
    id: textOr(item.id, fallback[index]?.id || `section-${index + 1}`, 80),
    label: textOr(item.label, fallback[index]?.label || "Secao", 80),
    purpose: textOr(
      item.purpose,
      fallback[index]?.purpose || "Organizar a narrativa da landing.",
      260,
    ),
  }));
}

function objectionsOr(
  values: AiLandingDraft["objections"],
  fallback: ObjectionResponse[],
) {
  if (!values?.length) {
    return fallback;
  }

  return values.slice(0, 5).map((item, index) => ({
    objection: textOr(
      item.objection,
      fallback[index]?.objection || "Ainda tenho duvidas.",
      180,
    ),
    response: textOr(
      item.response,
      fallback[index]?.response || "A pagina responde as principais objecoes.",
      360,
    ),
  }));
}

function marketingKitOr(
  value: AiLandingDraft["marketingKit"],
  fallback: MarketingKit,
): MarketingKit {
  if (!value) {
    return fallback;
  }

  return {
    instagramPosts: listOr(value.instagramPosts, fallback.instagramPosts, 5),
    adHooks: listOr(value.adHooks, fallback.adHooks, 3),
    whatsappMessages: listOr(
      value.whatsappMessages,
      fallback.whatsappMessages,
      3,
    ),
    bio: textOr(value.bio, fallback.bio, 180),
    pitch: textOr(value.pitch, fallback.pitch, 420),
    assetSuggestions: {
      coverImage: textOr(
        value.assetSuggestions?.coverImage,
        fallback.assetSuggestions.coverImage,
        260,
      ),
      promotionalMockup: textOr(
        value.assetSuggestions?.promotionalMockup,
        fallback.assetSuggestions.promotionalMockup,
        260,
      ),
      socialBanner: textOr(
        value.assetSuggestions?.socialBanner,
        fallback.assetSuggestions.socialBanner,
        260,
      ),
      thumbnail: textOr(
        value.assetSuggestions?.thumbnail,
        fallback.assetSuggestions.thumbnail,
        260,
      ),
    },
  };
}

interface AnthropicMessagesResponse {
  content?: {
    type: string;
    text?: string;
  }[];
}
