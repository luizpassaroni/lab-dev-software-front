import { SearchResultCard } from "@/modules/titles/components/SearchResultCard";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

type Props = {
  results: TSearchResult[];
};

export function SearchResultsGrid({ results }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {results.map((result, index) => (
        <SearchResultCard
          key={`${result.tmdbType}-${result.tmdbId}`}
          result={result}
          className="animate-card-rise"
          style={
            {
              "--i": Math.min(index, 9),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
