import { z } from "zod";

/**
 * Validation for the Cadastro form. Field schemas are reused per-field by
 * TanStack Form (inline validation) and composed into {@link registerSchema},
 * which the BFF route handler uses to validate the request body server-side.
 *
 * A deliberately simple email regex (per the issue) — the backend is the
 * source of truth for email validity; here we only catch obvious typos.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Nome deve ter entre 2 e 60 caracteres")
  .max(60, "Nome deve ter entre 2 e 60 caracteres");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email inválido")
  .regex(EMAIL_REGEX, "Email inválido");

export const passwordSchema = z
  .string()
  .min(8, "Senha deve ter ao menos 8 caracteres");

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type TRegisterInput = z.infer<typeof registerSchema>;
