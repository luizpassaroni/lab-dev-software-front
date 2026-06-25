"use client";

import { useState } from "react";
import { DiscoverGrid } from "@/modules/titles/components/DiscoverGrid";
import { GenreChips } from "@/modules/titles/components/GenreChips";
import { useGenres } from "@/modules/titles/hooks/useGenres";

type Props = {
  isAuthed: boolean;
};

export function HomeDiscover({ isAuthed }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: genres } = useGenres();
  const selectedGenre = genres?.find((genre) => genre.id === selectedId);
  const heading = selectedGenre?.nome ?? "Em alta";

  return (
    <section className="animate-home-rise animation-delay-200 mt-12 w-full max-w-6xl">
      <GenreChips selectedId={selectedId} onSelect={setSelectedId} />

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-medium text-muted-foreground text-sm">Categoria</p>
          <h2 className="mt-1 font-semibold text-2xl">{heading}</h2>
        </div>
      </div>

      <div className="mt-5">
        <DiscoverGrid genreId={selectedId} isAuthed={isAuthed} />
      </div>
    </section>
  );
}
