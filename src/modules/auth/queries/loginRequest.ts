import type { TAuthUser } from "@/modules/auth/types/TAuthUser";
import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser → BFF (same-origin `/api/auth/login`). The session is set as an
 * HttpOnly cookie by the route handler; the browser only receives `{ user }`.
 * Throws {@link ApiError} with the HTTP status so the form can map 401/429.
 */
export async function loginRequest(payload: TLoginPayload): Promise<TAuthUser> {
  let response: Response;
  try {
    response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError(0, "Não foi possível entrar agora. Tente novamente.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message ?? "Não foi possível entrar agora. Tente novamente.",
    );
  }

  return data.user as TAuthUser;
}
