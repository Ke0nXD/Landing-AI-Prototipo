"use server";

import type { GenerateLandingActionResult, LandingInput } from "@/types/landing";
import { generateLandingBlueprint } from "@/lib/ai/generate";
import { landingInputSchema } from "@/lib/validators/landing";

export async function generateLandingAction(
  input: LandingInput,
): Promise<GenerateLandingActionResult> {
  const parsed = landingInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      formError: "Revise os campos destacados antes de gerar a landing.",
    };
  }

  try {
    const data = await generateLandingBlueprint(parsed.data);

    return {
      ok: true,
      data,
    };
  } catch {
    return {
      ok: false,
      fieldErrors: {},
      formError:
        "Nao foi possivel gerar a landing agora. Tente novamente em instantes.",
    };
  }
}
