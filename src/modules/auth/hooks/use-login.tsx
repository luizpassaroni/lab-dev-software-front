"use client"

import { useMutation } from "@tanstack/react-query"
import { login } from "@/modules/auth/actions/login"
import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload"
import type { TAuthResponse } from "@/modules/auth/types/TAuthResponse"

export function useLogin() {
  return useMutation<TAuthResponse, Error, TLoginPayload>({
    mutationFn: login,
  })
}
