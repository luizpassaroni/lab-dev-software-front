"use client"

import { useQuery } from "@tanstack/react-query"
import { getMe } from "@/modules/auth/queries/getMe"

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  })
}
