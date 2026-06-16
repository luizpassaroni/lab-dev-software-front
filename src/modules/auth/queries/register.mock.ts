import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload";
import type { TRegisterResponse } from "@/modules/auth/types/TRegisterResponse";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Dev fallback used by the BFF route handler while the Nest backend is not
 * reachable (no `API_INTERNAL_URL`). Mirrors the FRONT-02 mock contract so the
 * Cadastro flow is demoable end-to-end without the backend. Swapping to the
 * real API is just setting the env vars — no code change (see register.ts).
 */
const DUPLICATE_EMAIL = "duplicado@teste.com";

export async function registerUserMock(
  payload: TRegisterPayload,
): Promise<TRegisterResponse> {
  // Simulate network latency so loading states are visible during the demo.
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (payload.email.trim().toLowerCase() === DUPLICATE_EMAIL) {
    throw new ApiError(409, "Este email já está cadastrado.");
  }

  return {
    id: Math.floor(Math.random() * 100_000),
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
  };
}
