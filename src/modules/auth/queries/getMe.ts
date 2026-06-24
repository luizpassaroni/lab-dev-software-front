import "server-only";

import { cache } from "react";
import { getSessionToken } from "@/modules/auth/helpers/session";
import { meMock } from "@/modules/auth/queries/auth.mock";
import type { TAuthUser } from "@/modules/auth/types/TAuthUser";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";

/**
 * Resolves the current user from the `session` cookie, server-side. Used by the
 * `/api/auth/me` route handler (browser rehydration) and by the server-rendered
 * Header. Returns `null` when there is no session or the token is rejected.
 */
export const getMe = cache(async (): Promise<TAuthUser | null> => {
  const token = await getSessionToken();
  if (!token) {
    return null;
  }

  if (!isBackendConfigured()) {
    return meMock(token);
  }

  const response = await nestFetch("/auth/me", { bearer: token });
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user;
});
