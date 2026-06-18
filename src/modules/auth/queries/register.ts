import "server-only";

import { registerUserMock } from "@/modules/auth/queries/register.mock";
import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload";
import type { TRegisterResponse } from "@/modules/auth/types/TRegisterResponse";
import { ApiError } from "@/shared/lib/api-error";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";

/**
 * Server-side register against the Nest API. Returns `{ id, name, email }`,
 * no session (register does not log the user in — PRD §8.1). Falls back to the
 * dev mock when the backend is not configured.
 */
export async function registerUser(
  payload: TRegisterPayload,
): Promise<TRegisterResponse> {
  if (!isBackendConfigured()) {
    return registerUserMock(payload);
  }

  const response = await nestFetch("/auth/register", {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const raw = data?.message;
    const message = Array.isArray(raw)
      ? raw[0]
      : (raw ?? "Não foi possível concluir o cadastro agora.");
    throw new ApiError(response.status, message);
  }

  return response.json();
}
