import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser -> BFF (same-origin `/api/titles/:type/:id/favorite`).
 * Performs POST to favorite or DELETE to unfavorite.
 */
export async function favoriteTitle(
  type: string,
  id: string,
  next: boolean,
): Promise<void> {
  let response: Response;
  const method = next ? "POST" : "DELETE";

  try {
    response = await fetch(`/api/titles/${type}/${id}/favorite`, { method });
  } catch {
    throw new ApiError(0, "Erro de rede ao processar o favorito.");
  }

  if (!response.ok) {
    let message = "Não foi possível atualizar o favorito.";
    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Ignore parse failure
    }
    throw new ApiError(response.status, message);
  }
}
