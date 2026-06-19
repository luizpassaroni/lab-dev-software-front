import "server-only";

import { getTitleMock } from "@/modules/titles/queries/titles.mock";
import type { TTitleDetail } from "@/modules/titles/types/TTitleDetail";
import { ApiError } from "@/shared/lib/api-error";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";

/** Server-side ficha proxy to the Nest API (preserves 400/404/502). */
export async function getTitleOnNest(
  type: "movie" | "tv",
  id: string,
): Promise<TTitleDetail> {
  if (!isBackendConfigured()) {
    return getTitleMock(type, id);
  }

  const response = await nestFetch(`/titles/${type}/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError(404, "Título não encontrado.");
    }
    if (response.status === 400) {
      throw new ApiError(400, "Requisição inválida.");
    }
    throw new ApiError(502, "Não foi possível carregar o título.");
  }

  return response.json();
}
