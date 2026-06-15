import { NextRequest } from "next/server";
import { passthrough, serverApi } from "@/services/serverApi";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const { type, id } = await params;
  const response = await serverApi(`/titles/${type}/${id}`, { method: "GET" });
  return passthrough(response);
}
