"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/modules/profile/queries/getProfile";

export function useProfile({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getProfile,
    enabled,
  });
}
