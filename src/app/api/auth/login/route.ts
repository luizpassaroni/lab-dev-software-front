import { NextResponse } from "next/server";
import { setSession } from "@/modules/auth/helpers/session";
import { loginOnNest } from "@/modules/auth/queries/login";
import { ApiError } from "@/shared/lib/api-error";

/** Real client IP, forwarded to the Nest rate-limiter as `X-Client-IP`. */
function clientIpFrom(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

/**
 * BFF: `POST /api/auth/login`. Calls Nest, gets `{ access_token, user }`, stores
 * the token in the HttpOnly `session` cookie and returns only `{ user }` — the
 * token never reaches the browser. Maps 401 / 429 from the Nest.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Requisição inválida." },
      { status: 400 },
    );
  }

  const { email, password } = (body ?? {}) as {
    email?: string;
    password?: string;
  };
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email e senha são obrigatórios." },
      { status: 400 },
    );
  }

  try {
    const { access_token, user } = await loginOnNest(
      { email, password },
      clientIpFrom(request),
    );
    await setSession(access_token);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { message: "Não foi possível entrar agora." },
      { status: 500 },
    );
  }
}
