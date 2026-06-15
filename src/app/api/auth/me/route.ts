import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  clearSession,
  passthrough,
  serverApi,
} from "@/services/serverApi";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const response = await serverApi("/auth/me", { method: "GET", bearer: token });
  const result = await passthrough(response);
  if (response.status === 401) {
    clearSession(result);
  }
  return result;
}
