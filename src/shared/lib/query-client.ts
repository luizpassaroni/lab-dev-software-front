import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { isUnauthorized } from "@/shared/lib/api-error";

function redirectOnUnauthorized(error: unknown) {
  if (!isUnauthorized(error)) return;
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  // Keep auth pages from redirecting themselves on expected 401 responses.
  if (path === "/login" || path === "/cadastro") return;
  window.location.assign("/login");
}

export function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError: redirectOnUnauthorized }),
    mutationCache: new MutationCache({ onError: redirectOnUnauthorized }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
