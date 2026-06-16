import "server-only";

import { ApiError } from "@/shared/lib/api-error";

/**
 * Server-only client for the Nest API. Lives behind the BFF route handlers —
 * never imported into the browser bundle (`server-only` enforces this), so
 * `INTERNAL_API_KEY` and `API_INTERNAL_URL` never leak client-side.
 *
 * Injects `X-Internal-Key` on every call (+ optional `Authorization: Bearer`
 * for protected routes and `X-Client-IP` for rate-limiting). Returns the raw
 * `Response` so callers map status/body to the browser contract.
 */
const baseUrl = process.env.API_INTERNAL_URL;
const internalKey = process.env.INTERNAL_API_KEY;

/** True when both BFF env vars are set. When false, queries use dev mocks. */
export function isBackendConfigured(): boolean {
  return Boolean(baseUrl && internalKey);
}

type NestRequest = {
  method?: string;
  body?: unknown;
  bearer?: string;
  clientIp?: string;
  searchParams?: Record<string, string>;
};

export async function nestFetch(
  path: string,
  req: NestRequest = {},
): Promise<Response> {
  if (!baseUrl || !internalKey) {
    throw new ApiError(500, "Backend não configurado.");
  }

  const url = new URL(`${baseUrl}${path}`);
  for (const [key, value] of Object.entries(req.searchParams ?? {})) {
    url.searchParams.set(key, value);
  }

  const headers: Record<string, string> = { "X-Internal-Key": internalKey };
  if (req.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (req.bearer) {
    headers.Authorization = `Bearer ${req.bearer}`;
  }
  if (req.clientIp) {
    headers["X-Client-IP"] = req.clientIp;
  }

  try {
    return await fetch(url, {
      method: req.method ?? "GET",
      headers,
      body: req.body !== undefined ? JSON.stringify(req.body) : undefined,
    });
  } catch {
    throw new ApiError(502, "Não foi possível contatar o serviço.");
  }
}
