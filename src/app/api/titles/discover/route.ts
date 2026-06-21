import { nestFetch } from "@/shared/lib/serverApi";
import { apiErrorResponse, nestResponse } from "../../_utils/nest-response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: Record<string, string> = {};

  const genre = searchParams.get("genre");
  const page = searchParams.get("page");
  if (genre) {
    params.genre = genre;
  }
  if (page) {
    params.page = page;
  }

  try {
    const response = await nestFetch("/titles/discover", {
      searchParams: params,
    });
    return nestResponse(response);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
