"use server"

import { register as registerQuery } from "@/modules/auth/queries/register"
import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload"
import type { TAuthUser } from "@/modules/auth/types/TAuthUser"

export async function register(
  payload: TRegisterPayload,
): Promise<TAuthUser> {
  return registerQuery(payload)
}
