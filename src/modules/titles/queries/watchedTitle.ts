import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser -> BFF (same-origin `/api/titles/:type/:id/watched`).
 * Performs POST to mark as watched or DELETE to unmark.
 *
 * A 409 on DELETE means there is an active rating blocking the unmark — the
 * back-end message is surfaced via {@link ApiError} for the caller to display.
 */
export async function watchedTitle(
  type: string,
  id: string,
  next: boolean,
): Promise<void> {
  let response: Response;
  const method = next ? "POST" : "DELETE";

  try {
    response = await fetch(`/api/titles/${type}/${id}/watched`, { method });
  } catch {
    throw new ApiError(0, "Erro de rede ao processar o visto.");
  }

  if (!response.ok) {
    let message = "Não foi possível atualizar o visto.";
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
