import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload"
import type { TAuthUser } from "@/modules/auth/types/TAuthUser"

export async function register(
  payload: TRegisterPayload,
): Promise<TAuthUser> {
  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.message ?? "Falha no cadastro")
  }

  return response.json()
}
