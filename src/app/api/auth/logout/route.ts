import { NextResponse } from "next/server";
import { clearSession } from "@/modules/auth/helpers/session";

/**
 * BFF: `POST /api/auth/logout`. 100% Next — clears the `session` cookie and
 * returns 204. There is no logout endpoint on the Nest (BACK-08).
 */
export async function POST() {
  await clearSession();
  return new NextResponse(null, { status: 204 });
}
