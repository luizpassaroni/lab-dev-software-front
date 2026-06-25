import { NextResponse } from "next/server";
import { getSessionToken } from "@/modules/auth/helpers/session";
import { PROFILE_MOCK } from "@/modules/profile/queries/profile.mock";
import { isBackendConfigured, nestFetch } from "@/shared/lib/serverApi";
import { apiErrorResponse, nestResponse } from "../../../_utils/nest-response";

export async function GET() {
  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  if (!isBackendConfigured()) {
    return NextResponse.json(PROFILE_MOCK);
  }

  try {
    const response = await nestFetch("/users/me/profile", { bearer: token });
    return nestResponse(response);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
