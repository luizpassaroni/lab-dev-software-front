"use client";

import { RatingControl } from "@/modules/titles/components/RatingControl";
import { WatchProviders } from "@/modules/titles/components/WatchProviders";
import { useTitleDetail } from "@/modules/titles/hooks/useTitleDetail";
import type { TTitleDetail } from "@/modules/titles/types/TTitleDetail";
import { ApiError } from "@/shared/lib/api-error";
import { Badge } from "@shared/components/ui/Badge";
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
  CalendarIcon,
  ClockIcon,
  FilmIcon,
  RotateCwIcon,
  SearchXIcon,
  StarIcon,
  TriangleAlertIcon,
  TvIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

type Props = {
  type: string;
  id: string;
};

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

export function TitleDetail({ type, id }: Props) {
  const { data, isPending, isError, error, refetch, isFetching } =
    useTitleDetail(type, id);

  if (isPending) {
    return <TitleDetailSkeleton />;
  }

  if (isError) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 404 || status === 400) {
      return <NotFoundState invalid={status === 400} />;
    }
    return <ErrorState onRetry={() => refetch()} retrying={isFetching} />;
  }

  return <TitleDetailContent title={data} />;
}

function TitleDetailContent({ title }: { title: TTitleDetail }) {
  const isMovie = title.tmdbType === "MOVIE";

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {title.backdropUrl ? (
        <img
          src={title.backdropUrl}
          alt=""
          className="mb-6 aspect-video w-full rounded-lg object-cover"
        />
      ) : null}

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="mx-auto w-44 shrink-0 overflow-hidden rounded-lg bg-muted md:mx-0 md:w-56">
          <div className="flex aspect-[2/3] items-center justify-center">
            {title.posterUrl ? (
              <img
                src={title.posterUrl}
                alt={title.title}
                className="size-full object-cover"
              />
            ) : isMovie ? (
              <FilmIcon className="size-10 text-muted-foreground" />
            ) : (
              <TvIcon className="size-10 text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-semibold text-3xl tracking-tight">
            {title.title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
            <Badge variant="secondary">{isMovie ? "Filme" : "Série"}</Badge>
            {title.year !== null ? (
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {title.year}
              </span>
            ) : null}
            {title.tmdbRating > 0 ? (
              <span className="flex items-center gap-1">
                <StarIcon className="size-4" />
                {title.tmdbRating.toFixed(1)}
              </span>
            ) : null}
            {isMovie && title.runtime !== null ? (
              <span className="flex items-center gap-1">
                <ClockIcon className="size-4" />
                {formatRuntime(title.runtime)}
              </span>
            ) : null}
            {!isMovie && title.seasons !== null ? (
              <span className="flex items-center gap-1">
                <TvIcon className="size-4" />
                {title.seasons === 1
                  ? "1 temporada"
                  : `${title.seasons} temporadas`}
              </span>
            ) : null}
          </div>

          {title.genres.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {title.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          ) : null}

          {title.overview ? (
            <p className="mt-4 text-pretty text-sm/relaxed">{title.overview}</p>
          ) : null}

          <div className="mt-6 max-w-md">
            <RatingControl
              type={title.tmdbType.toLowerCase() as "movie" | "tv"}
              id={String(title.tmdbId)}
              initialRating={title.userState?.rating ?? null}
              isAuthed={!!title.userState}
            />
          </div>

          {title.cast.length > 0 ? (
            <section className="mt-6">
              <h2 className="mb-3 font-semibold text-lg tracking-tight">
                Elenco
              </h2>
              <div className="flex flex-wrap gap-4">
                {title.cast.map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    className="flex w-24 flex-col items-center gap-1 text-center"
                  >
                    <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-muted">
                      {member.profileUrl ? (
                        <img
                          src={member.profileUrl}
                          alt={member.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <UserIcon className="size-6 text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-medium text-xs leading-tight">
                      {member.name}
                    </span>
                    {member.character ? (
                      <span className="text-muted-foreground text-xs leading-tight">
                        {member.character}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <WatchProviders providers={title.providers} />
    </main>
  );
}

function StateShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-4 py-16">
      <Empty>{children}</Empty>
    </main>
  );
}

function NotFoundState({ invalid }: { invalid: boolean }) {
  return (
    <StateShell>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>
          {invalid ? "Endereço inválido" : "Título não encontrado"}
        </EmptyTitle>
        <EmptyDescription>
          {invalid
            ? "O endereço acessado não corresponde a um filme ou série."
            : "Não encontramos o título que você procura."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild variant="outline">
          <Link href="/">Voltar para a Home</Link>
        </Button>
      </EmptyContent>
    </StateShell>
  );
}

function ErrorState({
  onRetry,
  retrying,
}: {
  onRetry: () => void;
  retrying: boolean;
}) {
  return (
    <StateShell>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlertIcon />
        </EmptyMedia>
        <EmptyTitle>Não foi possível carregar</EmptyTitle>
        <EmptyDescription>
          Ocorreu um erro ao buscar o título. Tente novamente em instantes.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onRetry} disabled={retrying}>
          <RotateCwIcon className={retrying ? "animate-spin" : undefined} />
          Tentar novamente
        </Button>
      </EmptyContent>
    </StateShell>
  );
}

function TitleDetailSkeleton() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <Skeleton className="mx-auto aspect-[2/3] w-44 shrink-0 rounded-lg md:mx-0 md:w-56" />
        <div className="min-w-0 flex-1 space-y-4">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </main>
  );
}
