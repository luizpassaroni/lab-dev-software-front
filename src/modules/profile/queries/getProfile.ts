import type { TProfile } from "@/modules/profile/types/TProfile";
import { ApiError } from "@/shared/lib/api-error";

export async function getProfile(): Promise<TProfile> {
  let response: Response;
  try {
    response = await fetch("/api/users/me/profile");
  } catch {
    throw new ApiError(
      0,
      "Não foi possível carregar o perfil. Tente novamente.",
    );
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "Não foi possível carregar o perfil. Tente novamente.",
    );
  }

  return response.json();
}
