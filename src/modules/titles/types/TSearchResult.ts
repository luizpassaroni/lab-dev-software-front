export type TSearchResult = {
  tmdbId: number
  tmdbType: "MOVIE" | "TV"
  title: string
  year: number | null
  posterUrl: string | null
  badge: "Filme" | "Série"
  score?: number
}

export type TSearchResponse = {
  results: TSearchResult[]
  page: number
  totalPages: number
  hasMore: boolean
}
