"use client";

import { rateTitle } from "@/modules/titles/queries/rateTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRating(type: string, id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (score: number | null) => rateTitle(type, id, score),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["titles", "detail", type, id],
      });
    },
  });
}
