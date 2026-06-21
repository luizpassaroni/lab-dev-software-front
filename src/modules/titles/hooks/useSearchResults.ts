"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchTitles } from "@/modules/titles/queries/searchTitles";

export function useSearchResults(query: string) {
  return useInfiniteQuery({
    queryKey: ["titles", "search-page", query],
    queryFn: ({ pageParam }) => searchTitles(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  });
}
