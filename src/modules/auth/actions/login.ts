"use server"

import { login as loginQuery } from "@/modules/auth/queries/login"
import { setAuthToken } from "@/modules/auth/helpers/setAuthToken"
import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload"
import type { TAuthResponse } from "@/modules/auth/types/TAuthResponse"

export async function login(payload: TLoginPayload): Promise<TAuthResponse> {
  const data = await loginQuery(payload)
  await setAuthToken(data.access_token)
  return data
}
