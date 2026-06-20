"use client";

import { SearchResultsGrid } from "@/modules/titles/components/SearchResultsGrid";
import { useSearchResults } from "@/modules/titles/hooks/useSearchResults";
import { Button } from "@shared/components/ui/Button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@shared/components/ui/Empty";
import { Skeleton } from "@shared/components/ui/Skeleton";
import {
  RotateCwIcon,
  SearchXIcon,
  TriangleAlertIcon,
} from "lucide-react";

type Props = {
  query: string;
};

export function SearchResults({ query }: Props) {
  const {
    data,
    isPending,
    isError,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchResults(query);

  if (isPending) {
    return <SearchResultsSkeleton query={query} />;
  }

  if (isError) {
    return (
      <SearchStateShell>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Não foi possível carregar</EmptyTitle>
          <EmptyDescription>
            Ocorreu um erro ao buscar os títulos. Tente novamente em instantes.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => refetch()} disabled={isFetching}>
            <RotateCwIcon className={isFetching ? "animate-spin" : undefined} />
            Tentar novamente
          </Button>
        </EmptyContent>
      </SearchStateShell>
    );
  }

  const results = data.pages.flatMap((page) => page.results);

  if (results.length === 0) {
    return (
      <SearchStateShell>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon />
          </EmptyMedia>
          <EmptyTitle>Nenhum resultado</EmptyTitle>
          <EmptyDescription>
            Nenhum resultado para "{query}". Tente outro termo.
          </EmptyDescription>
        </EmptyHeader>
      </SearchStateShell>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="mb-6">
        <p className="text-muted-foreground text-sm">Resultados para</p>
        <h1 className="font-semibold text-3xl tracking-tight">{query}</h1>
      </div>

      <SearchResultsGrid results={results} />

      {hasNextPage ? (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <RotateCwIcon className="animate-spin" />
            ) : null}
            {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      ) : null}
    </main>
  );
}

function SearchStateShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-16">
      <Empty>{children}</Empty>
    </main>
  );
}

function SearchResultsSkeleton({ query }: { query: string }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="mb-6">
        <p className="text-muted-foreground text-sm">Resultados para</p>
        <h1 className="font-semibold text-3xl tracking-tight">{query}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}
