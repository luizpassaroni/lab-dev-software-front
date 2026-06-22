"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { watchedTitle } from "@/modules/titles/queries/watchedTitle";

export function useWatched(type: string, id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (next: boolean) => watchedTitle(type, id, next),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["titles", "detail", type, id],
      });
    },
  });
}
