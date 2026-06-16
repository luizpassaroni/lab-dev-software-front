import { NextResponse } from "next/server";
import { getTitleOnNest } from "@/modules/titles/queries/getTitleOnNest";
import { ApiError } from "@/shared/lib/api-error";

/** BFF: `GET /api/titles/:type/:id` → proxies the Nest ficha (404 | 502). */
export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/titles/[type]/[id]">,
) {
  const { type, id } = await ctx.params;

  if (type !== "movie" && type !== "tv") {
    return NextResponse.json({ message: "Tipo inválido." }, { status: 400 });
  }

  try {
    const data = await getTitleOnNest(type, id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { message: "Não foi possível carregar o título." },
      { status: 502 },
    );
  }
}
