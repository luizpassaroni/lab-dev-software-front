import type { TTitleDetail } from "@/modules/titles/types/TTitleDetail";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser → BFF (same-origin `/api/titles/:type/:id`). The browser never talks
 * to the Nest API directly. Preserves the status (400 | 404 | 502 | 0 network)
 * so the ficha can branch on it.
 */
export async function getTitle(
  type: string,
  id: string,
): Promise<TTitleDetail> {
  let response: Response;
  try {
    response = await fetch(`/api/titles/${type}/${id}`);
  } catch {
    throw new ApiError(0, "Não foi possível carregar o título.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, "Não foi possível carregar o título.");
  }

  return response.json();
}
