"use client";

import { Button } from "@shared/components/ui/Button";
import { Skeleton } from "@shared/components/ui/Skeleton";
import { useGenres } from "@/modules/titles/hooks/useGenres";

type Props = {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
};

export function GenreChips({ selectedId, onSelect }: Props) {
  const { data: genres, isPending, isError } = useGenres();

  if (isPending) {
    return <GenreChipsSkeleton />;
  }

  if (isError) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        type="button"
        variant={selectedId === null ? "default" : "outline"}
        size="sm"
        className="transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:scale-[1.02] aria-pressed:shadow-[0_0_0_1px_oklch(0.7686_0.1647_70.0804_/_0.35)]"
        aria-pressed={selectedId === null}
        onClick={() => onSelect(null)}
      >
        Em alta
      </Button>
      {genres.map((genre) => {
        const active = genre.id === selectedId;
        return (
          <Button
            key={genre.id}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            className="transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:scale-[1.02] aria-pressed:shadow-[0_0_0_1px_oklch(0.7686_0.1647_70.0804_/_0.35)]"
            aria-pressed={active}
            onClick={() => onSelect(active ? null : genre.id)}
          >
            {genre.nome}
          </Button>
        );
      })}
    </div>
  );
}

function GenreChipsSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-20 rounded-md" />
      ))}
    </div>
  );
}
