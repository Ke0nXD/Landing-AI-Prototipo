"use server";

import type {
  GenerateLandingActionResult,
  LandingPromptInput,
} from "@/types/landing";
import { generateLandingFromPrompt } from "@/lib/ai/generate";
import { landingPromptSchema } from "@/lib/validators/landing";

export async function generateLandingAction(
  input: LandingPromptInput,
): Promise<GenerateLandingActionResult> {
  const parsed = landingPromptSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Revise os campos destacados antes de gerar a landing.",
    };
  }

  try {
    const data = await generateLandingFromPrompt(parsed.data);

    return {
      ok: true,
      data,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("ANTHROPIC_API_KEY")
    ) {
      return {
        ok: false,
        fieldErrors: {},
        formError:
          "Para usar Claude Sonnet, adicione ANTHROPIC_API_KEY no .env.local ou selecione Mock local.",
      };
    }

    return {
      ok: false,
      fieldErrors: {},
      formError:
        "Nao foi possivel gerar a landing agora. Tente novamente em instantes.",
    };
  }
}
