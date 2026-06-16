import type { TSearchResponse } from "@/modules/titles/types/TSearchResult"

export async function searchTitles(q: string, page = 1): Promise<TSearchResponse> {
  const params = new URLSearchParams({ q, page: String(page) })
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/titles/search?${params}`,
  )

  if (!response.ok) throw new Error("Falha ao buscar títulos")

  return response.json()
}
