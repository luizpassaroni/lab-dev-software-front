"use server"

import { getAuthToken } from "@/modules/auth/helpers/getAuthToken"
import { deleteAuthToken } from "@/modules/auth/helpers/deleteAuthToken"

export async function logout(): Promise<void> {
  const token = await getAuthToken()

  if (token) {
    await fetch(`${process.env.API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).catch(() => {})
  }

  await deleteAuthToken()
}
