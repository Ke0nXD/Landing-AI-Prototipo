import type { LandingInput } from "@/types/landing";

export interface AiGenerationAdapter {
  generate(input: LandingInput): Promise<string>;
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
    "Replace the mock functions in lib/ai/generate.ts with a Hugging Face Inference Endpoint adapter that implements AiGenerationAdapter.",
} as const;
