"use client";

import { searchTitles } from "@/modules/titles/queries/searchTitles";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useSearchResults(query: string) {
  return useInfiniteQuery({
    queryKey: ["titles", "search-page", query],
    queryFn: ({ pageParam }) => searchTitles(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.hasMore ? last.page + 1 : undefined,
  });
}
