import { HttpError } from "@/services/http";
import type { SearchResponse, SearchResult, TitleDetail } from "@/types/api";

const DELAY_MS = 300;
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY_MS));
}

const sampleResults: SearchResult[] = [
  {
    tmdbId: 872585,
    tmdbType: "MOVIE",
    title: "Oppenheimer",
    year: 2023,
    posterUrl: `${TMDB_IMG}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    badge: "Filme",
  },
  {
    tmdbId: 1396,
    tmdbType: "TV",
    title: "Breaking Bad",
    year: 2008,
    posterUrl: `${TMDB_IMG}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`,
    badge: "Série",
  },
  {
    tmdbId: 603,
    tmdbType: "MOVIE",
    title: "Matrix",
    year: 1999,
    posterUrl: `${TMDB_IMG}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
    badge: "Filme",
  },
  {
    tmdbId: 66732,
    tmdbType: "TV",
    title: "Stranger Things",
    year: 2016,
    posterUrl: `${TMDB_IMG}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
    badge: "Série",
  },
];

export async function search(query: string, page = 1): Promise<SearchResponse> {
  if (!query.trim()) {
    throw new HttpError(400, "Informe um termo de busca.");
  }
  const totalPages = 3;
  return delay({
    results: sampleResults,
    page,
    totalPages,
    hasMore: page < totalPages,
  });
}

const titles: Record<string, TitleDetail> = {
  "movie:872585": {
    tmdbId: 872585,
    tmdbType: "MOVIE",
    title: "Oppenheimer",
    year: 2023,
    overview:
      "A historia de J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atomica durante a Segunda Guerra Mundial.",
    posterUrl: `${TMDB_IMG}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    backdropUrl: `${TMDB_IMG}/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg`,
    runtime: 181,
    seasons: null,
    tmdbRating: 8.1,
    genres: ["Drama", "Historia"],
    cast: [
      { name: "Cillian Murphy", character: "J. Robert Oppenheimer", profileUrl: null },
      { name: "Emily Blunt", character: "Kitty Oppenheimer", profileUrl: null },
    ],
    providers: {
      flatrate: [{ name: "Amazon Prime Video", logoUrl: null }],
      rent: [{ name: "Apple TV", logoUrl: null }],
      buy: [{ name: "Apple TV", logoUrl: null }],
    },
  },
  // Caso sem provedor no Brasil: as tres listas ficam vazias.
  "movie:603": {
    tmdbId: 603,
    tmdbType: "MOVIE",
    title: "Matrix",
    year: 1999,
    overview:
      "Um hacker descobre que a realidade que conhece e uma simulacao e se junta a uma rebeliao contra as maquinas.",
    posterUrl: `${TMDB_IMG}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
    backdropUrl: `${TMDB_IMG}/icmmSD4vTTDKOq2vvdulafOGw93.jpg`,
    runtime: 136,
    seasons: null,
    tmdbRating: 8.2,
    genres: ["Acao", "Ficcao cientifica"],
    cast: [
      { name: "Keanu Reeves", character: "Neo", profileUrl: null },
      { name: "Laurence Fishburne", character: "Morpheus", profileUrl: null },
    ],
    providers: { flatrate: [], rent: [], buy: [] },
  },
};

export async function getTitle(type: "movie" | "tv", id: number): Promise<TitleDetail> {
  const title = titles[`${type}:${id}`];
  if (!title) {
    throw new HttpError(404, "Titulo nao encontrado.");
  }
  return delay(title);
}
