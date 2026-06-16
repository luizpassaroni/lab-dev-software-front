import "server-only";

import type { TSearchResponse } from "@/modules/titles/types/TSearchResult";
import type { TTitleDetail } from "@/modules/titles/types/TTitleDetail";
import { ApiError } from "@/shared/lib/api-error";

/**
 * Dev fallbacks for search + ficha, used by the BFF when the Nest backend is
 * not configured. Posters are `null` (the UI renders a fallback) to keep the
 * mock self-contained — no external image dependencies.
 */
const SEARCH_RESULTS: TSearchResponse["results"] = [
  {
    tmdbId: 872585,
    tmdbType: "MOVIE",
    title: "Oppenheimer",
    year: 2023,
    posterUrl: null,
    badge: "Filme",
  },
  {
    tmdbId: 1396,
    tmdbType: "TV",
    title: "Breaking Bad",
    year: 2008,
    posterUrl: null,
    badge: "Série",
  },
  {
    tmdbId: 27205,
    tmdbType: "MOVIE",
    title: "A Origem",
    year: 2010,
    posterUrl: null,
    badge: "Filme",
  },
  {
    tmdbId: 66732,
    tmdbType: "TV",
    title: "Stranger Things",
    year: 2016,
    posterUrl: null,
    badge: "Série",
  },
];

export async function searchTitlesMock(
  q: string,
  page: number,
): Promise<TSearchResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!q.trim()) {
    throw new ApiError(400, "Query ausente.");
  }

  const totalPages = 3;
  return {
    results: SEARCH_RESULTS,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}

export async function getTitleMock(
  type: string,
  id: string,
): Promise<TTitleDetail> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (type !== "movie" && type !== "tv") {
    throw new ApiError(404, "Título não encontrado.");
  }

  return {
    tmdbId: Number(id) || 872585,
    tmdbType: type,
    title: type === "movie" ? "Oppenheimer" : "Breaking Bad",
    year: type === "movie" ? 2023 : 2008,
    overview:
      "Resumo de demonstração do título — substituído pelo overview real da TMDB quando o backend estiver conectado.",
    posterUrl: null,
    backdropUrl: null,
    runtime: type === "movie" ? 181 : null,
    seasons: type === "tv" ? 5 : null,
    tmdbRating: 8.4,
    genres: type === "movie" ? ["Drama", "História"] : ["Drama", "Crime"],
    cast: [
      {
        name: "Ator Demonstração",
        character: "Protagonista",
        profileUrl: null,
      },
    ],
    providers: {
      flatrate: [{ id: 8, name: "Netflix", logoUrl: null }],
      rent: [],
      buy: [],
    },
  };
}
