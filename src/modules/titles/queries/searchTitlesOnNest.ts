import "server-only";

import { searchTitlesMock } from "@/modules/titles/queries/titles.mock";
import type { TSearchResponse } from "@/modules/titles/types/TSearchResult";
import { ApiError } from "@/shared/lib/api-error";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";

/** Server-side search proxy to the Nest API (preserves 400/502). */
export async function searchTitlesOnNest(
  q: string,
  page: number,
): Promise<TSearchResponse> {
  if (!isBackendConfigured()) {
    return searchTitlesMock(q, page);
  }

  const response = await nestFetch("/titles/search", {
    searchParams: { q, page: String(page) },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status === 400 ? 400 : 502,
      "Não foi possível buscar agora.",
    );
  }

  return response.json();
}
