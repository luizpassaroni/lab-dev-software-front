import "server-only";

import { cookies } from "next/headers";

/**
 * The session is a single HttpOnly cookie holding the Nest JWT. It is set/read/
 * cleared ONLY on the server (route handlers, server components) — never via
 * `document.cookie`. See PRD §8.1 / CONTEXT.md ("sessão").
 */
export const SESSION_COOKIE = "session";

const SESSION_MAX_AGE = 60 * 60 * 24; // 24h (PRD §8.1)

function sessionCookieOptions() {
  return {
    httpOnly: true,
    // Secure is required in production; relaxed on localhost (http) for dev.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function setSession(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions());
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
