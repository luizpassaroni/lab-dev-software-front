import { nestFetch } from "@/shared/lib/serverApi";
import { apiErrorResponse, nestResponse } from "../_utils/nest-response";

export async function GET() {
  try {
    const response = await nestFetch("/genres");
    return nestResponse(response);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
