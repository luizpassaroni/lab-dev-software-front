"use server"

import { getAuthToken } from "@/modules/auth/helpers/getAuthToken"
import type { TAuthUser } from "@/modules/auth/types/TAuthUser"

export async function getMe(): Promise<TAuthUser | null> {
  const token = await getAuthToken()

  if (!token) return null

  const response = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })

  if (!response.ok) return null

  const data = await response.json()
  return data.user
}
