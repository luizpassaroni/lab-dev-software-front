import { ApiError } from "@/shared/lib/api-error";

/**
 * Browser -> BFF (same-origin `/api/titles/:type/:id/rating`).
 * Performs POST with { score } or DELETE to remove rating.
 */
export async function rateTitle(
  type: string,
  id: string,
  score: number | null,
): Promise<{ rating: number | null; watched: boolean } | void> {
  let response: Response;
  const method = score === null ? "DELETE" : "POST";
  const body = score === null ? undefined : JSON.stringify({ score });

  try {
    response = await fetch(`/api/titles/${type}/${id}/rating`, {
      method,
      headers:
        score === null ? undefined : { "Content-Type": "application/json" },
      body,
    });
  } catch {
    throw new ApiError(0, "Erro de rede ao processar a avaliação.");
  }

  if (!response.ok) {
    let message = "Não foi possível processar a avaliação.";
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

  if (response.status === 204) {
    return;
  }

  return response.json();
}
