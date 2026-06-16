import { NextResponse } from "next/server";
import { searchTitlesOnNest } from "@/modules/titles/queries/searchTitlesOnNest";
import { ApiError } from "@/shared/lib/api-error";

/** BFF: `GET /api/titles/search?q&page` → proxies the Nest (400 | 502). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ message: "Query ausente." }, { status: 400 });
  }

  const parsedPage = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  try {
    const data = await searchTitlesOnNest(q, page);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { message: "Não foi possível buscar agora." },
      { status: 502 },
    );
  }
}
