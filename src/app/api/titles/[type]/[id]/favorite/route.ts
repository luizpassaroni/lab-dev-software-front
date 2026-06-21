import { NextResponse } from "next/server";
import { getSessionToken } from "@/modules/auth/helpers/session";
import { nestFetch } from "@/shared/lib/serverApi";
import { apiErrorResponse, nestResponse } from "../../../../_utils/nest-response";

type TitleActionContext = RouteContext<"/api/titles/[type]/[id]/favorite">;

async function forward(method: "POST" | "DELETE", ctx: TitleActionContext) {
  const { type, id } = await ctx.params;
  if (type !== "movie" && type !== "tv") {
    return NextResponse.json({ message: "Tipo inválido." }, { status: 400 });
  }

  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  try {
    const response = await nestFetch(`/titles/${type}/${id}/favorite`, {
      method,
      bearer: token,
    });
    return nestResponse(response);
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(_request: Request, ctx: TitleActionContext) {
  return forward("POST", ctx);
}

export async function DELETE(_request: Request, ctx: TitleActionContext) {
  return forward("DELETE", ctx);
}
