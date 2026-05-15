import type { GeneratedLanding, LandingPromptInput } from "@/types/landing";

export interface AiGenerationAdapter {
  id: string;
  label: string;
  generate(input: LandingPromptInput): Promise<GeneratedLanding>;
}

export const futureHuggingFaceTasks = [
  "text-generation",
  "zero-shot-classification",
  "copy-tone-rewrite",
  "landing-section-ranking",
] as const;

export const aiSafetyContract = {
  clientPolicy:
    "No API keys, model tokens, service-role Supabase keys, or raw model prompts are exposed to client components.",
  serverPolicy:
    "Generation runs behind server actions or route handlers, with Zod validation and sanitized inputs before model calls.",
  swapPlan:
    "Add providers that implement AiGenerationAdapter. The app already supports mock generation and Anthropic Claude through server-side environment variables.",
} as const;
