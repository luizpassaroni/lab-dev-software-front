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
import { SearchResultsGrid } from "@/modules/titles/components/SearchResultsGrid";
import { useDiscover } from "@/modules/titles/hooks/useDiscover";

type Props = {
  genreId: number | null;
};

const TRENDING_FALLBACK_GENRE_ID = 28;

export function DiscoverGrid({ genreId }: Props) {
  if (genreId === null) {
    return <TrendingDiscoverGrid />;
  }

  return (
    <DiscoverGridQuery
      genreId={genreId}
      emptyDescription="Nenhum título encontrado para este gênero."
    />
  );
}

function TrendingDiscoverGrid() {
  const query = useDiscover(null);

  if (query.isError) {
    return (
      <DiscoverGridQuery
        genreId={TRENDING_FALLBACK_GENRE_ID}
        emptyDescription="Nenhum título em alta encontrado agora."
      />
    );
  }

  return (
    <DiscoverGridView
      query={query}
      emptyDescription="Nenhum título em alta encontrado agora."
    />
  );
}

function DiscoverGridQuery({
  genreId,
  emptyDescription,
}: {
  genreId: number;
  emptyDescription: string;
}) {
  return (
    <DiscoverGridView
      query={useDiscover(genreId)}
      emptyDescription={emptyDescription}
    />
  );
}

function DiscoverGridView({
  query,
  emptyDescription,
}: {
  query: ReturnType<typeof useDiscover>;
  emptyDescription: string;
}) {
  const {
    data,
    isPending,
    isError,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = query;

  if (isPending) {
    return <DiscoverGridSkeleton />;
  }

  if (isError) {
    return (
      <DiscoverStateShell>
        <ErrorState
          description="Ocorreu um erro ao carregar os destaques. Tente novamente em instantes."
          onRetry={() => refetch()}
          retrying={isFetching}
        />
      </DiscoverStateShell>
    );
  }

  const results = data.pages.flatMap((page) => page.results);

  if (results.length === 0) {
    return (
      <DiscoverStateShell>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchXIcon />
          </EmptyMedia>
          <EmptyTitle>Nenhum destaque</EmptyTitle>
          <EmptyDescription>{emptyDescription}</EmptyDescription>
        </EmptyHeader>
      </DiscoverStateShell>
    );
  }

  return (
    <section className="w-full">
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
    </section>
  );
}

function DiscoverStateShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full items-center justify-center py-16">
      <Empty>{children}</Empty>
    </section>
  );
}

function DiscoverGridSkeleton() {
  return (
    <section className="w-full">
      <LoadingState />
    </section>
  );
}
