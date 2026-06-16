import "server-only";

import { getTitleMock } from "@/modules/titles/queries/titles.mock";
import type { TTitleDetail } from "@/modules/titles/types/TTitleDetail";
import { ApiError } from "@/shared/lib/api-error";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";

/** Server-side ficha proxy to the Nest API (preserves 404/502). */
export async function getTitleOnNest(
  type: "movie" | "tv",
  id: string,
): Promise<TTitleDetail> {
  if (!isBackendConfigured()) {
    return getTitleMock(type, id);
  }

  const response = await nestFetch(`/titles/${type}/${id}`);

  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 404 : 502,
      response.status === 404
        ? "Título não encontrado."
        : "Não foi possível carregar o título.",
    );
  }

  return response.json();
}
