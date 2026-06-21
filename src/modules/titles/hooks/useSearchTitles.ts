"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { debounce, useQueryState } from "nuqs";
import { searchTitles } from "@/modules/titles/queries/searchTitles";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

export function useSearchTitles() {
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
    shallow: true,
    clearOnDefault: true,
    history: "replace",
    limitUrlUpdates: debounce(300),
  });

  const { data, isFetching } = useQuery({
    queryKey: ["titles", "search", query],
    queryFn: () => searchTitles(query),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });

  const results: TSearchResult[] = data?.results ?? [];

  return { query, setQuery, results, isFetching };
}
