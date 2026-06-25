import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@shared/components/ui/Empty";
import Link from "next/link";
import { SearchResultsGrid } from "@/modules/titles/components/SearchResultsGrid";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";

type ListKey = "Vistos" | "Avaliados" | "Favoritos";

type Props = {
  title: ListKey;
  count: number;
  results: TSearchResult[];
};

const EMPTY_CONFIG: Record<ListKey, { title: string; description: string }> = {
  Vistos: {
    title: "Nenhum título visto ainda",
    description: "Marque filmes e séries como vistos para encontrá-los aqui.",
  },
  Avaliados: {
    title: "Sem avaliações ainda",
    description:
      "Avalie os títulos que assistiu e sua nota fica registrada aqui.",
  },
  Favoritos: {
    title: "Nenhum favorito ainda",
    description: "Favorite o que você ama para encontrar quando quiser.",
  },
};

export function ProfileList({ title, count, results }: Props) {
  const empty = EMPTY_CONFIG[title];

  return (
    <section>
      <div className="mb-4 flex items-baseline gap-2">
        <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
        <span className="text-muted-foreground text-sm">· {count}</span>
      </div>
      {results.length === 0 ? (
        <Empty>
          <EmptyContent>
            <EmptyTitle>{empty.title}</EmptyTitle>
            <EmptyDescription>{empty.description}</EmptyDescription>
            <Link
              href="/"
              className="mt-1 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explorar catálogo
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <SearchResultsGrid results={results} />
      )}
    </section>
  );
}
