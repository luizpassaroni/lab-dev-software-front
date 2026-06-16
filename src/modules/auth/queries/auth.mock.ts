import "server-only";

import type { TAuthResponse } from "@/modules/auth/types/TAuthResponse";
import type { TAuthUser } from "@/modules/auth/types/TAuthUser";
import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Dev fallbacks for login + me, used by the BFF when the Nest backend is not
 * configured. Mirrors the FRONT-02 mock contract:
 *   - `rate-limit@teste.com` → 429
 *   - password `errada`      → 401
 * `loginMock` issues {@link MOCK_SESSION_TOKEN}; `meMock` accepts only that
 * token, so the login → me → logout cycle is demoable end-to-end.
 */
export const MOCK_SESSION_TOKEN = "mock-session-token";

const MOCK_USER: TAuthUser = {
  id: 1,
  name: "Usuária Teste",
  email: "teste@teste.com",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

export async function loginMock(
  payload: TLoginPayload,
): Promise<TAuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const email = payload.email.trim().toLowerCase();
  if (email === "rate-limit@teste.com") {
    throw new ApiError(429, "Muitas tentativas, aguarde alguns minutos.");
  }
  if (payload.password === "errada") {
    throw new ApiError(401, "Email ou senha inválidos.");
  }

  return { access_token: MOCK_SESSION_TOKEN, user: { ...MOCK_USER, email } };
}

export async function meMock(token: string): Promise<TAuthUser | null> {
  return token === MOCK_SESSION_TOKEN ? MOCK_USER : null;
}
