import { NextResponse } from "next/server";
import { getMe } from "@/modules/auth/queries/getMe";

/**
 * BFF: `GET /api/auth/me`. Reads the `session` cookie, resolves the user from
 * the Nest, and returns `{ user }` — or 401 when there is no valid session.
 * Used by the browser to rehydrate auth state after a reload.
 */
export async function GET() {
  const user = await getMe();
  if (!user) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }
  return NextResponse.json({ user }, { status: 200 });
}
