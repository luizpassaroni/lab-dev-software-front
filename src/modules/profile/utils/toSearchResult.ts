import type {
  TProfileItem,
  TRatedItem,
} from "@/modules/profile/types/TProfile";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

function badge(tmdbType: "MOVIE" | "TV"): "Filme" | "Série" {
  return tmdbType === "MOVIE" ? "Filme" : "Série";
}

export function profileItemToSearchResult(item: TProfileItem): TSearchResult {
  return {
    tmdbId: item.tmdbId,
    tmdbType: item.tmdbType,
    title: item.title,
    year: item.year,
    posterUrl: item.posterUrl,
    badge: badge(item.tmdbType),
  };
}

export function ratedItemToSearchResult(item: TRatedItem): TSearchResult {
  return {
    ...profileItemToSearchResult(item),
    score: item.score,
    isUserScore: true,
  };
}
