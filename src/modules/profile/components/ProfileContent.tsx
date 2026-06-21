"use client";

import { ProfileHeader } from "@/modules/profile/components/ProfileHeader";
import { ProfileList } from "@/modules/profile/components/ProfileList";
import { ProfileStats } from "@/modules/profile/components/ProfileStats";
import { useProfile } from "@/modules/profile/hooks/useProfile";
import {
  profileItemToSearchResult,
  ratedItemToSearchResult,
} from "@/modules/profile/utils/toSearchResult";
import type { TAuthUser } from "@/modules/auth/types/TAuthUser";
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
import { RotateCwIcon, TriangleAlertIcon } from "lucide-react";

type Props = {
  user: TAuthUser;
};

export function ProfileContent({ user }: Props) {
  const { data, isPending, isError, refetch, isFetching } = useProfile();

  if (isPending) {
    return (
      <ProfileShell user={user}>
        <ProfileLoadingSkeleton />
      </ProfileShell>
    );
  }

  if (isError) {
    return (
      <ProfileShell user={user}>
        <div className="flex flex-1 items-center justify-center py-16">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TriangleAlertIcon />
              </EmptyMedia>
              <EmptyTitle>Não foi possível carregar</EmptyTitle>
              <EmptyDescription>
                Ocorreu um erro ao buscar seu perfil. Tente novamente em instantes.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => refetch()} disabled={isFetching}>
                <RotateCwIcon className={isFetching ? "animate-spin" : undefined} />
                Tentar novamente
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </ProfileShell>
    );
  }

  return (
    <ProfileShell user={user}>
      <ProfileStats totais={data.totais} />
      <div className="mt-10 flex flex-col gap-10">
        <ProfileList
          title="Vistos"
          results={data.vistos.map(profileItemToSearchResult)}
        />
        <ProfileList
          title="Avaliados"
          results={data.avaliados.map(ratedItemToSearchResult)}
        />
        <ProfileList
          title="Favoritos"
          results={data.favoritos.map(profileItemToSearchResult)}
        />
      </div>
    </ProfileShell>
  );
}

function ProfileShell({
  user,
  children,
}: {
  user: TAuthUser;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="mb-8">
        <ProfileHeader name={user.name} createdAt={user.createdAt} />
      </div>
      {children}
    </main>
  );
}

function ProfileLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="h-7 w-24" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
