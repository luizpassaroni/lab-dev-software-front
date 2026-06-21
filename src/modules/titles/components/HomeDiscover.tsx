"use client";

import { useState } from "react";
import { DiscoverGrid } from "@/modules/titles/components/DiscoverGrid";
import { GenreChips } from "@/modules/titles/components/GenreChips";

export function HomeDiscover() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="mt-10 w-full max-w-6xl">
      <GenreChips selectedId={selectedId} onSelect={setSelectedId} />
      {selectedId != null ? (
        <div className="mt-8">
          <DiscoverGrid genreId={selectedId} />
        </div>
      ) : null}
    </div>
  );
}
