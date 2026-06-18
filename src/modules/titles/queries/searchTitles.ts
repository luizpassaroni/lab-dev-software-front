import type { TSearchResponse } from "@/modules/titles/types/TSearchResult";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser → BFF (same-origin `/api/titles/search`). The browser never talks to
 * the Nest API directly.
 */
export async function searchTitles(
  q: string,
  page = 1,
): Promise<TSearchResponse> {
  const params = new URLSearchParams({ q, page: String(page) });

  let response: Response;
  try {
    response = await fetch(`/api/titles/search?${params}`);
  } catch {
    throw new ApiError(0, "Não foi possível buscar agora. Tente novamente.");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Não foi possível buscar agora. Tente novamente.",
    );
  }

  return response.json();
}
