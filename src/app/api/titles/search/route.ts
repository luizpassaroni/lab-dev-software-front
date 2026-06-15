import { NextRequest } from "next/server";
import { passthrough, serverApi } from "@/services/serverApi";

export async function GET(request: NextRequest) {
  const response = await serverApi(`/titles/search${request.nextUrl.search}`, {
    method: "GET",
  });
  return passthrough(response);
}
