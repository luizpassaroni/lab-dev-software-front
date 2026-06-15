import { NextRequest, NextResponse } from "next/server";
import { passthrough, serverApi, setSession } from "@/services/serverApi";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Corpo inválido." }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0].trim();

  const response = await serverApi("/auth/login", {
    method: "POST",
    body,
    clientIp,
  });

  if (!response.ok) {
    return passthrough(response);
  }

  const data = (await response.json()) as { access_token: string; user: unknown };
  const result = NextResponse.json({ user: data.user });
  setSession(result, data.access_token);
  return result;
}
