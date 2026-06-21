"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/modules/profile/queries/getProfile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getProfile,
  });
}
