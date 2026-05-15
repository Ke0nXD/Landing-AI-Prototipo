import { z } from "zod";
import { aiProviders, visualTones } from "@/types/landing";
import { hasUnsafeIntent, sanitizeTextInput } from "./sanitize";

const safeBusinessText = (min: number, max: number, label: string) =>
  z
    .string()
    .min(min, `${label} precisa ter pelo menos ${min} caracteres.`)
    .max(max, `${label} deve ter no maximo ${max} caracteres.`)
    .refine((value) => !hasUnsafeIntent(value), {
      message: `${label} contem padroes inseguros.`,
    })
    .transform(sanitizeTextInput)
    .refine((value) => value.length >= min, {
      message: `${label} ficou vazio depois da sanitizacao.`,
    });

export const landingPromptSchema = z.object({
  prompt: safeBusinessText(20, 4000, "Prompt"),
  visualTone: z.enum(visualTones),
  provider: z.enum(aiProviders),
  model: z
    .string()
    .max(120, "Modelo deve ter no maximo 120 caracteres.")
    .optional()
    .transform((value) => (value ? sanitizeTextInput(value) : undefined)),
});

export type LandingPromptSchema = z.infer<typeof landingPromptSchema>;
