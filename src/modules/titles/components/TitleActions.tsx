"use client";

import { cn } from "@shared/lib/cn";
import { EyeIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useFavorite } from "@/modules/titles/hooks/useFavorite";
import { useWatched } from "@/modules/titles/hooks/useWatched";

type TitleActionsProps = {
  type: "movie" | "tv";
  id: string;
  initialWatched: boolean;
  initialFavorite: boolean;
  isAuthed: boolean;
};

export function TitleActions({
  type,
  id,
  initialWatched,
  initialFavorite,
  isAuthed,
}: TitleActionsProps) {
  const router = useRouter();
  const watchedMutation = useWatched(type, id);
  const favoriteMutation = useFavorite(type, id);

  const [watched, setWatched] = React.useState<boolean>(initialWatched);
  const [favorite, setFavorite] = React.useState<boolean>(initialFavorite);
  const [error, setError] = React.useState<string | null>(null);
  const [watchedAnim, setWatchedAnim] = React.useState(false);
  const [watchedIconAnim, setWatchedIconAnim] = React.useState(false);
  const [favoriteAnim, setFavoriteAnim] = React.useState(false);
  const [favoriteIconAnim, setFavoriteIconAnim] = React.useState(false);

  // Sync state if the initial props change (e.g., after a mutation or data refetch)
  React.useEffect(() => {
    setWatched(initialWatched);
  }, [initialWatched]);

  React.useEffect(() => {
    setFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleWatched = () => {
    if (!isAuthed) {
      router.push("/login");
      return;
    }
    const next = !watched;
    if (next) {
      setWatchedAnim(true);
      setWatchedIconAnim(true);
    }
    watchedMutation.mutate(next, {
      onSuccess: () => {
        setWatched(next);
        setError(null);
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };

  const handleFavorite = () => {
    if (!isAuthed) {
      router.push("/login");
      return;
    }
    const next = !favorite;
    if (next) {
      setFavoriteAnim(true);
      setFavoriteIconAnim(true);
    }
    favoriteMutation.mutate(next, {
      onSuccess: () => {
        setFavorite(next);
        setError(null);
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };

  return (
    <div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleWatched}
          disabled={watchedMutation.isPending}
          aria-pressed={watched}
          aria-label="Marcar como visto"
          className={cn(
            "group inline-flex flex-col items-center gap-2 rounded-xl border-2 px-5 py-4 cursor-pointer select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "transition-all duration-200 ease-out",
            watched
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border text-foreground hover:border-primary/70 hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5",
            watchedAnim && "animate-action-pop",
          )}
          onAnimationEnd={(e) => {
            if (e.animationName === "action-pop") setWatchedAnim(false);
          }}
        >
          <EyeIcon
            className={cn(
              "size-7 transition-transform duration-200",
              !watched && "group-hover:scale-110",
              watchedIconAnim && "animate-eye-pop",
            )}
            onAnimationEnd={(e) => {
              e.stopPropagation();
              setWatchedIconAnim(false);
            }}
          />
          <span className="text-xs font-semibold leading-none">Visto</span>
        </button>

        <button
          type="button"
          onClick={handleFavorite}
          disabled={favoriteMutation.isPending}
          aria-pressed={favorite}
          aria-label="Adicionar aos favoritos"
          className={cn(
            "group inline-flex flex-col items-center gap-2 rounded-xl border-2 px-5 py-4 cursor-pointer select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "transition-all duration-200 ease-out",
            favorite
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border text-foreground hover:border-primary/70 hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5",
            favoriteAnim && "animate-action-pop",
          )}
          onAnimationEnd={(e) => {
            if (e.animationName === "action-pop") setFavoriteAnim(false);
          }}
        >
          <HeartIcon
            className={cn(
              "size-7 transition-transform duration-200",
              favorite && "fill-current",
              !favorite && "group-hover:scale-110",
              favoriteIconAnim && "animate-heart-beat",
            )}
            onAnimationEnd={(e) => {
              e.stopPropagation();
              setFavoriteIconAnim(false);
            }}
          />
          <span className="text-xs font-semibold leading-none">Favoritar</span>
        </button>
      </div>
      {error ? <p className="mt-2 text-destructive text-sm">{error}</p> : null}
    </div>
  );
}
