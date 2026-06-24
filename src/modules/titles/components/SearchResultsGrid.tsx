import { SearchResultCard } from "@/modules/titles/components/SearchResultCard";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

type Props = {
  results: TSearchResult[];
  favoritedKeys?: Set<string>;
};

export function SearchResultsGrid({ results, favoritedKeys }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {results.map((result, index) => {
        const key = `${result.tmdbType}-${result.tmdbId}`;
        return (
          <SearchResultCard
            key={key}
            result={result}
            favorited={favoritedKeys?.has(key) ?? false}
            className="animate-card-rise"
            style={
              {
                "--i": Math.min(index, 9),
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
