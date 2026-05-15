import { z } from "zod";
import { visualTones } from "@/types/landing";
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

export const landingInputSchema = z.object({
  businessName: safeBusinessText(2, 80, "Nome do negocio"),
  niche: safeBusinessText(2, 80, "Nicho"),
  audience: safeBusinessText(4, 160, "Publico-alvo"),
  offer: safeBusinessText(4, 180, "Oferta principal"),
  brandTone: safeBusinessText(3, 80, "Tom da marca"),
  pageGoal: safeBusinessText(4, 180, "Objetivo da pagina"),
  visualTone: z.enum(visualTones),
});

export type LandingInputSchema = z.infer<typeof landingInputSchema>;
