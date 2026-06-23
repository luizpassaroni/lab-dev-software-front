"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverTitles } from "@/modules/titles/queries/discoverTitles";

export function useDiscover(genreId: number | null) {
  return useInfiniteQuery({
    queryKey: ["titles", "discover", genreId],
    queryFn: ({ pageParam }) => discoverTitles(genreId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  });
}
