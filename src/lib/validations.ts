import { z } from "zod";
import { CONTRACT_TYPES, MODALITIES } from "./constants";

export const jobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),
  area: z
    .string()
    .trim()
    .min(2, "Informe a área.")
    .max(80, "A área deve ter no máximo 80 caracteres."),
  city: z
    .string()
    .trim()
    .min(2, "Informe a cidade.")
    .max(80, "A cidade deve ter no máximo 80 caracteres."),
  state: z
    .string()
    .trim()
    .length(2, "A UF deve ter 2 letras.")
    .transform((value) => value.toUpperCase()),
  modality: z.enum(MODALITIES, { message: "Selecione a modalidade." }),
  contractType: z.enum(CONTRACT_TYPES, {
    message: "Selecione o regime de contratação.",
  }),
  description: z
    .string()
    .trim()
    .min(30, "A descrição deve ter pelo menos 30 caracteres."),
});

export type JobInput = z.infer<typeof jobSchema>;

export function fieldErrorsFrom(
  error: z.ZodError
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
