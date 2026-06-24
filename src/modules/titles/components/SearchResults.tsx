"use client";

import { Button } from "@shared/components/ui/Button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@shared/components/ui/Empty";
import { ErrorState } from "@shared/components/ui/ErrorState";
import { LoadingState } from "@shared/components/ui/LoadingState";
import { RotateCwIcon, SearchXIcon } from "lucide-react";
import { useMemo } from "react";
import { useProfile } from "@/modules/profile/hooks/useProfile";
import { SearchResultsGrid } from "@/modules/titles/components/SearchResultsGrid";
import { useSearchResults } from "@/modules/titles/hooks/useSearchResults";

type Props = {
  query: string;
  isAuthed: boolean;
};

export function SearchResults({ query, isAuthed }: Props) {
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

  const { data: profile } = useProfile({ enabled: isAuthed });
  const favoritedKeys = useMemo(
    () =>
      new Set(
        profile?.favoritos.map((item) => `${item.tmdbType}-${item.tmdbId}`) ??
          [],
      ),
    [profile],
  );

  if (isPending) {
    return <SearchResultsSkeleton query={query} />;
  }

  if (isError) {
    return (
      <SearchStateShell>
        <ErrorState
          description="Ocorreu um erro ao buscar os títulos. Tente novamente em instantes."
          onRetry={() => refetch()}
          retrying={isFetching}
        />
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
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div aria-hidden className="search-ambient" />
      <div className="mb-6">
        <p className="text-muted-foreground text-sm">Resultados para</p>
        <h1 className="font-semibold text-3xl tracking-tight">{query}</h1>
      </div>

      <SearchResultsGrid results={results} favoritedKeys={favoritedKeys} />

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
      <LoadingState />
    </main>
  );
}
