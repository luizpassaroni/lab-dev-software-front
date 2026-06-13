import { SearchResponse, TitleDetail } from '@/types/api';
import { apiFetch } from './http';

export async function search(q: string, page: number): Promise<SearchResponse> {
  return apiFetch<SearchResponse>(`/titles/search?q=${encodeURIComponent(q)}&page=${page}`);
}

export async function ficha(type: 'movie' | 'tv', id: number): Promise<TitleDetail> {
  return apiFetch<TitleDetail>(`/titles/${type}/${id}`);
}