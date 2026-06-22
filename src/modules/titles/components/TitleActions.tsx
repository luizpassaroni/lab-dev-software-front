"use client";

import { Button } from "@shared/components/ui/Button";
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
        <Button
          variant={watched ? "default" : "outline"}
          size="sm"
          onClick={handleWatched}
          disabled={watchedMutation.isPending}
        >
          <EyeIcon />
          Visto
        </Button>
        <Button
          variant={favorite ? "default" : "outline"}
          size="sm"
          onClick={handleFavorite}
          disabled={favoriteMutation.isPending}
        >
          <HeartIcon className={favorite ? "fill-current" : undefined} />
          Favoritar
        </Button>
      </div>
      {error ? <p className="mt-2 text-destructive text-sm">{error}</p> : null}
    </div>
  );
}
