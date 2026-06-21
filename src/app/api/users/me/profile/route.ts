import { NextResponse } from "next/server";
import { getSessionToken } from "@/modules/auth/helpers/session";
import { nestFetch } from "@/shared/lib/serverApi";
import { apiErrorResponse, nestResponse } from "../../../_utils/nest-response";

export async function GET() {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  try {
    const response = await nestFetch("/users/me/profile", { bearer: token });
    return nestResponse(response);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
