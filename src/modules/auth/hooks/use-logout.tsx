"use client"

import { useMutation } from "@tanstack/react-query"
import { logout } from "@/modules/auth/actions/logout"

export function useLogout() {
  return useMutation<void, Error, void>({
    mutationFn: logout,
  })
}
