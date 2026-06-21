import type { TSearchResult } from "@/modules/titles/types/TSearchResult";
import { Badge } from "@shared/components/ui/Badge";
import { FilmIcon, TvIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  result: TSearchResult;
};

export function SearchResultCard({ result }: Props) {
  const isMovie = result.tmdbType === "MOVIE";
  const segment = isMovie ? "movie" : "tv";
  const Icon = isMovie ? FilmIcon : TvIcon;

  return (
    <Link
      href={`/titulo/${segment}/${result.tmdbId}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="flex aspect-[2/3] items-center justify-center bg-muted">
        {result.posterUrl ? (
          <img
            src={result.posterUrl}
            alt={result.title}
            className="size-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <Icon className="size-10 text-muted-foreground" />
        )}
      </div>

      <div className="flex min-h-28 flex-1 flex-col gap-2 p-3">
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 font-medium text-sm leading-snug">
            {result.title}
          </h2>
          <p className="mt-1 text-muted-foreground text-xs">
            {result.year ?? "Ano indisponível"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{result.badge}</Badge>
          {result.score !== undefined ? (
            <Badge variant="outline" className="ml-auto shrink-0 font-semibold tabular-nums">
              {result.score}
            </Badge>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
