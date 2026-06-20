"use client";

import { getTitle } from "@/modules/titles/queries/getTitle";
import { ApiError } from "@/shared/lib/api-error";
import { useQuery } from "@tanstack/react-query";

export function useTitleDetail(type: string, id: string) {
  return useQuery({
    queryKey: ["titles", "detail", type, id],
    queryFn: () => getTitle(type, id),
    retry: (failureCount, error) => {
      // 400/404 são definitivos; só erros transitórios (rede/502) reterão.
      if (
        error instanceof ApiError &&
        (error.status === 400 || error.status === 404)
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
