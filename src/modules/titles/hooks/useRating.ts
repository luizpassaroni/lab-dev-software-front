"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateTitle } from "@/modules/titles/queries/rateTitle";

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
