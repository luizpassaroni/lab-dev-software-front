import { Badge } from "@shared/components/ui/Badge";
import { cn } from "@shared/lib/cn";
import { FilmIcon, HeartIcon, StarIcon, TvIcon } from "lucide-react";
import Link from "next/link";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

type Props = {
  result: TSearchResult;
  favorited?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function SearchResultCard({
  result,
  favorited = false,
  className,
  style,
}: Props) {
  const isMovie = result.tmdbType === "MOVIE";
  const segment = isMovie ? "movie" : "tv";
  const Icon = isMovie ? FilmIcon : TvIcon;

  return (
    <Link
      href={`/titulo/${segment}/${result.tmdbId}`}
      style={style}
      className={cn(
        "group flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-[background-color,border-color,box-shadow,filter] duration-200 hover:border-primary/35 hover:bg-accent/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="relative flex aspect-[2/3] items-center justify-center overflow-hidden bg-muted after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklch,var(--primary)_26%,transparent),transparent_42%)] after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100">
        {favorited ? (
          <HeartIcon className="absolute top-2 right-2 z-10 size-5 fill-primary text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
        ) : null}
        {result.posterUrl ? (
          <img
            src={result.posterUrl}
            alt={result.title}
            className="size-full object-cover transition-[filter,transform] duration-300 group-hover:scale-[1.04] group-hover:saturate-125"
          />
        ) : (
          <Icon className="size-10 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
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
            result.isUserScore ? (
              <Badge
                variant="outline"
                className="ml-auto shrink-0 border-accent/50 bg-accent/20 font-semibold tabular-nums"
              >
                <StarIcon className="size-2.5" />
                {result.score}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="ml-auto shrink-0 font-semibold tabular-nums"
              >
                {result.score}
              </Badge>
            )
          ) : null}
        </div>
      </div>
    </Link>
  );
}
