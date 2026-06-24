"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteTitle } from "@/modules/titles/queries/favoriteTitle";

export function useFavorite(type: string, id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (next: boolean) => favoriteTitle(type, id, next),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["titles", "detail", type, id],
      });
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}
