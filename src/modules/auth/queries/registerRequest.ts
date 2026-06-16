import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload";
import type { TRegisterResponse } from "@/modules/auth/types/TRegisterResponse";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser → BFF (same-origin `/api/auth/register`). The browser never talks to
 * the Nest API directly. Throws an {@link ApiError} carrying the HTTP status so
 * the form can branch (409 → email field; 4xx/5xx → generic message).
 */
export async function registerRequest(
  payload: TRegisterPayload,
): Promise<TRegisterResponse> {
  let response: Response;
  try {
    response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError(
      0,
      "Não foi possível concluir o cadastro agora. Tente novamente.",
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message ??
        "Não foi possível concluir o cadastro agora. Tente novamente.",
    );
  }

  return data as TRegisterResponse;
}
