import { NextRequest, NextResponse } from "next/server";
import { passthrough, serverApi } from "@/services/serverApi";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Corpo inválido." }, { status: 400 });
  }

  const response = await serverApi("/auth/register", { method: "POST", body });
  return passthrough(response);
}
