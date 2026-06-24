"use client";

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
import { ErrorState } from "@shared/components/ui/ErrorState";
import { Skeleton } from "@shared/components/ui/Skeleton";
import {
  CalendarIcon,
  ClockIcon,
  FilmIcon,
  SearchXIcon,
  StarIcon,
  TvIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { RatingControl } from "@/modules/titles/components/RatingControl";
import { TitleActions } from "@/modules/titles/components/TitleActions";
import { WatchProviders } from "@/modules/titles/components/WatchProviders";
import { useTitleDetail } from "@/modules/titles/hooks/useTitleDetail";
import type { TTitleDetail } from "@/modules/titles/types/TTitleDetail";
import { ApiError } from "@/shared/lib/api-error";

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
    return (
      <StateShell>
        <ErrorState
          description="Ocorreu um erro ao buscar o título. Tente novamente em instantes."
          onRetry={() => refetch()}
          retrying={isFetching}
        />
      </StateShell>
    );
  }

  return <TitleDetailContent title={data} />;
}

function TitleDetailContent({ title }: { title: TTitleDetail }) {
  const isMovie = title.tmdbType === "MOVIE";

  return (
    <div className="relative flex-1">
      {title.backdropUrl ? (
        <div className="title-backdrop" aria-hidden="true">
          <img src={title.backdropUrl} alt="" className="title-backdrop__img" />
          <div className="title-backdrop__scrim" />
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-8 pb-12">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
          {/* Left column — continuous rail */}
          <div className="min-w-0">
            {/* Poster + title block */}
            <div className="flex gap-5 sm:gap-6">
              <div className="w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-44">
                <div className="flex aspect-[2/3] items-center justify-center">
                  {title.posterUrl ? (
                    <img
                      src={title.posterUrl}
                      alt={title.title}
                      className="size-full object-cover [transition:transform_380ms_cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
                    />
                  ) : isMovie ? (
                    <FilmIcon className="size-8 text-muted-foreground" />
                  ) : (
                    <TvIcon className="size-8 text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <h1 className="font-semibold text-2xl leading-snug tracking-tight sm:text-3xl">
                  {title.title}
                </h1>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-muted-foreground text-sm">
                  <Badge variant="secondary" className="gap-1">
                    {isMovie ? (
                      <FilmIcon className="size-3" />
                    ) : (
                      <TvIcon className="size-3" />
                    )}
                    {isMovie ? "Filme" : "Série"}
                  </Badge>

                  {title.year !== null ? (
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="size-3.5" />
                      {title.year}
                    </span>
                  ) : null}

                  {title.tmdbRating > 0 ? (
                    <span className="flex items-center gap-1 tabular-nums">
                      <StarIcon className="size-3.5" />
                      {title.tmdbRating.toFixed(1)}
                    </span>
                  ) : null}

                  {isMovie && title.runtime !== null ? (
                    <span className="flex items-center gap-1">
                      <ClockIcon className="size-3.5" />
                      {formatRuntime(title.runtime)}
                    </span>
                  ) : null}

                  {!isMovie && title.seasons !== null ? (
                    <span>
                      {title.seasons === 1
                        ? "1 temporada"
                        : `${title.seasons} temporadas`}
                    </span>
                  ) : null}
                </div>

                {title.genres.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {title.genres.map((genre) => (
                      <Badge key={genre} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Synopsis */}
            {title.overview ? (
              <p className="mt-5 text-pretty text-sm/relaxed">
                {title.overview}
              </p>
            ) : null}

            {/* Actions */}
            <div className="mt-5">
              <TitleActions
                type={title.tmdbType.toLowerCase() as "movie" | "tv"}
                id={String(title.tmdbId)}
                initialWatched={title.userState?.watched ?? false}
                initialFavorite={title.userState?.favorite ?? false}
                isAuthed={!!title.userState}
              />
            </div>

            <hr className="mt-6 border-border" />

            {/* Rating */}
            <div className="mt-6">
              <RatingControl
                type={title.tmdbType.toLowerCase() as "movie" | "tv"}
                id={String(title.tmdbId)}
                initialRating={title.userState?.rating ?? null}
                isAuthed={!!title.userState}
              />
            </div>

            {/* Cast */}
            {title.cast.length > 0 ? (
              <>
                <hr className="mt-6 border-border" />
                <section className="mt-6">
                  <h2 className="mb-4 font-semibold text-lg tracking-tight">
                    Elenco
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {title.cast.map((member, index) => (
                      <div
                        key={`${member.name}-${index}`}
                        className="flex w-20 flex-col items-center gap-1.5 text-center"
                      >
                        <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-muted">
                          {member.profileUrl ? (
                            <img
                              src={member.profileUrl}
                              alt={member.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <UserIcon className="size-5 text-muted-foreground" />
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
              </>
            ) : null}

            {/* Mobile: watch providers inline */}
            <div className="mt-8 lg:hidden">
              <WatchProviders providers={title.providers} />
            </div>
          </div>

          {/* Right column — sticky watch providers panel */}
          <div className="hidden lg:block lg:sticky lg:top-20">
            <WatchProviders providers={title.providers} />
          </div>
        </div>
      </main>
    </div>
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

function TitleDetailSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-8 pb-12">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
        <div className="min-w-0 space-y-5">
          <div className="flex gap-5 sm:gap-6">
            <Skeleton className="aspect-[2/3] w-28 shrink-0 rounded-lg sm:w-44" />
            <div className="flex-1 space-y-3 pt-1">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
          </div>
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-9 w-44" />
        </div>
        <Skeleton className="hidden h-56 rounded-xl lg:block" />
      </div>
    </main>
  );
}
