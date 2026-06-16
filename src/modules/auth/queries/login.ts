import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload"
import type { TAuthResponse } from "@/modules/auth/types/TAuthResponse"

export async function login(payload: TLoginPayload): Promise<TAuthResponse> {
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.message ?? "Falha na autenticação")
  }

  return response.json()
}
