import { NextResponse } from "next/server";
import { ApiError } from "@/shared/lib/api-error";

export async function nestResponse(response: Response) {
  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await response.json().catch(() => null);
  return NextResponse.json(data, { status: response.status });
}

export function apiErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  return NextResponse.json(
    { message: "Não foi possível contatar o serviço." },
    { status: 502 },
  );
}
