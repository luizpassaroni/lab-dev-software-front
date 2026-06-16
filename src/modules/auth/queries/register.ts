import { registerUserMock } from "@/modules/auth/queries/register.mock";
import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload";
import type { TRegisterResponse } from "@/modules/auth/types/TRegisterResponse";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Server-to-server call to the Nest API. Runs ONLY inside the BFF route handler
 * — never in the browser — so `INTERNAL_API_KEY` never leaves the server.
 *
 * Until the backend is configured (`API_INTERNAL_URL` + `INTERNAL_API_KEY`),
 * it delegates to the dev mock so the flow works locally.
 */
export async function registerUser(
  payload: TRegisterPayload,
): Promise<TRegisterResponse> {
  const baseUrl = process.env.API_INTERNAL_URL;
  const internalKey = process.env.INTERNAL_API_KEY;

  if (!baseUrl || !internalKey) {
    return registerUserMock(payload);
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Key": internalKey,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // DNS / connection failure reaching the Nest API.
    throw new ApiError(502, "Não foi possível concluir o cadastro agora.");
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    // Nest (class-validator) may return `message` as a string or string[].
    const raw = data?.message;
    const message = Array.isArray(raw)
      ? raw[0]
      : (raw ?? "Não foi possível concluir o cadastro agora.");
    throw new ApiError(response.status, message);
  }

  return response.json();
}
