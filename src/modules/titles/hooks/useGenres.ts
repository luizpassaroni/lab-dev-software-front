"use client";

import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/modules/titles/queries/getGenres";

export function useGenres() {
  return useQuery({
    queryKey: ["titles", "genres"],
    queryFn: getGenres,
  });
}
