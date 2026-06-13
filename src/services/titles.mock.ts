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
    tmdbType: "movie",
    title: "Oppenheimer",
    year: 2023,
    posterUrl: `${TMDB_IMG}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
  },
  {
    tmdbId: 1396,
    tmdbType: "tv",
    title: "Breaking Bad",
    year: 2008,
    posterUrl: `${TMDB_IMG}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`,
  },
  {
    tmdbId: 603,
    tmdbType: "movie",
    title: "Matrix",
    year: 1999,
    posterUrl: `${TMDB_IMG}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
  },
  {
    tmdbId: 66732,
    tmdbType: "tv",
    title: "Stranger Things",
    year: 2016,
    posterUrl: `${TMDB_IMG}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
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
    tmdbType: "movie",
    title: "Oppenheimer",
    overview:
      "A historia de J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atomica durante a Segunda Guerra Mundial.",
    posterUrl: `${TMDB_IMG}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    providers: {
      flatrate: [{ providerId: 119, name: "Amazon Prime Video", logoUrl: null }],
      rent: [{ providerId: 2, name: "Apple TV", logoUrl: null }],
      buy: [{ providerId: 2, name: "Apple TV", logoUrl: null }],
    },
  },
  // Caso sem provedor no Brasil: as tres listas ficam vazias.
  "movie:603": {
    tmdbId: 603,
    tmdbType: "movie",
    title: "Matrix",
    overview:
      "Um hacker descobre que a realidade que conhece e uma simulacao e se junta a uma rebeliao contra as maquinas.",
    posterUrl: `${TMDB_IMG}/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg`,
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
