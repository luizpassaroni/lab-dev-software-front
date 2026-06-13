import { http } from "@/services/http";
import type { SearchResponse, TitleDetail } from "@/types/api";

export function search(query: string, page = 1): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query, page: String(page) });
  return http<SearchResponse>(`/titles/search?${params.toString()}`);
}

export function getTitle(type: "movie" | "tv", id: number): Promise<TitleDetail> {
  return http<TitleDetail>(`/titles/${type}/${id}`);
}
