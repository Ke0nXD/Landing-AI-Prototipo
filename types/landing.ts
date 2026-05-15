export const visualTones = [
  "premium-dark",
  "minimal-light",
  "tech-neon",
  "corporate-elegant",
] as const;

export type VisualTone = (typeof visualTones)[number];

export interface LandingInput {
  businessName: string;
  niche: string;
  audience: string;
  offer: string;
  brandTone: string;
  pageGoal: string;
  visualTone: VisualTone;
}

export interface LandingStructureItem {
  id: string;
  label: string;
  purpose: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SocialProof {
  quote: string;
  author: string;
  role: string;
  metric: string;
}

export interface ObjectionResponse {
  objection: string;
  response: string;
}

export interface MarketingKit {
  instagramPosts: string[];
  adHooks: string[];
  whatsappMessages: string[];
  bio: string;
  pitch: string;
  assetSuggestions: {
    coverImage: string;
    promotionalMockup: string;
    socialBanner: string;
    thumbnail: string;
  };
}

export interface LandingDesignSystem {
  tone: VisualTone;
  palette: {
    background: string;
    surface: string;
    accent: string;
    secondaryAccent: string;
    text: string;
  };
  components: string[];
  motion: string[];
}

export interface GeneratedLanding {
  id: string;
  createdAt: string;
  input: LandingInput;
  headline: string;
  subheadline: string;
  benefits: string[];
  pains: string[];
  solution: string[];
  ctas: {
    primary: string;
    secondary: string;
  };
  socialProof: SocialProof[];
  plans: PricingPlan[];
  faq: FaqItem[];
  structure: LandingStructureItem[];
  objections: ObjectionResponse[];
  marketingKit: MarketingKit;
  designSystem: LandingDesignSystem;
}

export interface GenerateLandingResult {
  ok: true;
  data: GeneratedLanding;
}

export interface GenerateLandingError {
  ok: false;
  fieldErrors: Partial<Record<keyof LandingInput, string[]>>;
  formError?: string;
}

export type GenerateLandingActionResult =
  | GenerateLandingResult
  | GenerateLandingError;
