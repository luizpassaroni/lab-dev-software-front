import type { TGenre } from "@/modules/titles/types/TGenre";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser → BFF (same-origin `/api/genres`). The browser never talks to the
 * Nest API directly.
 */
export async function getGenres(): Promise<TGenre[]> {
  let response: Response;
  try {
    response = await fetch("/api/genres");
  } catch {
    throw new ApiError(0, "Não foi possível carregar os gêneros agora.");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Não foi possível carregar os gêneros agora.",
    );
  }

  return response.json();
}
