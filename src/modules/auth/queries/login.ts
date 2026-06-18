import "server-only";

import { loginMock } from "@/modules/auth/queries/auth.mock";
import type { TAuthResponse } from "@/modules/auth/types/TAuthResponse";
import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload";
import { ApiError } from "@/shared/lib/api-error";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";

/**
 * Server-side login against the Nest API. Returns `{ access_token, user }` — the
 * route handler keeps the token in the cookie and returns only `{ user }` to the
 * browser. `clientIp` is forwarded as `X-Client-IP` for the Nest rate-limiter.
 */
export async function loginOnNest(
  payload: TLoginPayload,
  clientIp?: string,
): Promise<TAuthResponse> {
  if (!isBackendConfigured()) {
    return loginMock(payload);
  }

  const response = await nestFetch("/auth/login", {
    method: "POST",
    body: payload,
    clientIp,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const raw = data?.message;
    const message = Array.isArray(raw)
      ? raw[0]
      : (raw ?? "Não foi possível entrar agora.");
    throw new ApiError(response.status, message);
  }

  return response.json();
}
