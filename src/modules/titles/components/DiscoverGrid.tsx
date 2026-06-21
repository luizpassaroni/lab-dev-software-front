"use client";

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
import { RotateCwIcon, SearchXIcon, TriangleAlertIcon } from "lucide-react";
import { SearchResultsGrid } from "@/modules/titles/components/SearchResultsGrid";
import { useDiscover } from "@/modules/titles/hooks/useDiscover";

type Props = {
  genreId: number;
};

export function DiscoverGrid({ genreId }: Props) {
  const {
    data,
    isPending,
    isError,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useDiscover(genreId);

  if (isPending) {
    return <DiscoverGridSkeleton />;
  }

  if (isError) {
    return (
      <DiscoverStateShell>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Não foi possível carregar</EmptyTitle>
          <EmptyDescription>
            Ocorreu um erro ao carregar os destaques. Tente novamente em
            instantes.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => refetch()} disabled={isFetching}>
            <RotateCwIcon className={isFetching ? "animate-spin" : undefined} />
            Tentar novamente
          </Button>
        </EmptyContent>
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
          <EmptyDescription>
            Nenhum título encontrado para este gênero.
          </EmptyDescription>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
