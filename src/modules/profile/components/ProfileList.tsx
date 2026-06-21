import { SearchResultsGrid } from "@/modules/titles/components/SearchResultsGrid";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

type Props = {
  title: string;
  results: TSearchResult[];
};

export function ProfileList({ title, results }: Props) {
  return (
    <section>
      <h2 className="mb-4 font-semibold text-xl">{title}</h2>
      {results.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Você ainda não tem itens aqui.
        </p>
      ) : (
        <SearchResultsGrid results={results} />
      )}
    </section>
  );
}
