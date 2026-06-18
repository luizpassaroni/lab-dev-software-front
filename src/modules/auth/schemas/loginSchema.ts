import { z } from "zod";

/**
 * Login validation is intentionally minimal — both fields required, no email
 * regex (the backend is the source of truth; we let the user try even with an
 * unusual-looking email). Per FRONT-04.
 */
export const loginEmailSchema = z.string().trim().min(1, "Informe seu email");

export const loginPasswordSchema = z.string().min(1, "Informe sua senha");

export const loginSchema = z.object({
  email: loginEmailSchema,
  password: loginPasswordSchema,
});
