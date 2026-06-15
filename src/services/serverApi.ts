import "server-only";

import { NextResponse } from "next/server";

export const SESSION_COOKIE = "session";

type ServerApiOptions = {
  method: string;
  body?: unknown;
  bearer?: string;
  clientIp?: string;
};

export async function serverApi(
  path: string,
  { method, body, bearer, clientIp }: ServerApiOptions,
): Promise<Response> {
  const baseUrl = process.env.API_INTERNAL_URL;
  const internalKey = process.env.INTERNAL_API_KEY;
  if (!baseUrl || !internalKey) {
    return internalServerErrorResponse();
  }

  const headers: Record<string, string> = {
    "X-Internal-Key": internalKey,
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
  if (clientIp) headers["X-Client-IP"] = clientIp;

  try {
    return await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    return internalServerErrorResponse();
  }
}

export async function passthrough(response: Response): Promise<NextResponse> {
  const body = await response.text();
  return new NextResponse(body || null, {
    status: response.status,
    headers: body ? { "Content-Type": "application/json" } : undefined,
  });
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setSession(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE, token, {
    ...cookieOptions,
    maxAge: 86400,
  });
}

export function clearSession(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

function internalServerErrorResponse(): NextResponse {
  return NextResponse.json(
    { message: "Não foi possível conectar ao servidor." },
    { status: 502 },
  );
}
