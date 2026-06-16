"use client"

import { useMutation } from "@tanstack/react-query"
import { register } from "@/modules/auth/actions/register"
import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload"
import type { TAuthUser } from "@/modules/auth/types/TAuthUser"

export function useRegister() {
  return useMutation<TAuthUser, Error, TRegisterPayload>({
    mutationFn: register,
  })
}
