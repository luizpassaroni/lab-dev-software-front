import type { TSearchResponse } from "@/modules/titles/types/TSearchResult";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser → BFF (same-origin `/api/titles/discover`). The browser never talks
 * to the Nest API directly.
 */
export async function discoverTitles(
  genreId: number,
  page = 1,
): Promise<TSearchResponse> {
  const params = new URLSearchParams({
    genre: String(genreId),
    page: String(page),
  });

  let response: Response;
  try {
    response = await fetch(`/api/titles/discover?${params}`);
  } catch {
    throw new ApiError(0, "Não foi possível carregar agora. Tente novamente.");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Não foi possível carregar agora. Tente novamente.",
    );
  }

  return response.json();
}
