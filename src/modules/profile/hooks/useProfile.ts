"use client";

import { getProfile } from "@/modules/profile/queries/getProfile";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getProfile,
  });
}
