import { NextResponse } from "next/server";
import { getSessionToken } from "@/modules/auth/helpers/session";
import { nestFetch } from "@/shared/lib/serverApi";
import {
  apiErrorResponse,
  nestResponse,
} from "../../../../_utils/nest-response";

type TitleActionContext = RouteContext<"/api/titles/[type]/[id]/rating">;

async function forward(
  method: "POST" | "DELETE",
  request: Request,
  ctx: TitleActionContext,
) {
  const { type, id } = await ctx.params;
  if (type !== "movie" && type !== "tv") {
    return NextResponse.json({ message: "Tipo inválido." }, { status: 400 });
  }

  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  let body: { score: unknown } | undefined;
  if (method === "POST") {
    try {
      const data = (await request.json()) as { score?: unknown } | null;
      body = { score: data?.score };
    } catch {
      return NextResponse.json(
        { message: "Requisição inválida." },
        { status: 400 },
      );
    }
  }

  try {
    const response = await nestFetch(`/titles/${type}/${id}/rating`, {
      method,
      body,
      bearer: token,
    });
    return nestResponse(response);
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: Request, ctx: TitleActionContext) {
  return forward("POST", request, ctx);
}

export async function DELETE(request: Request, ctx: TitleActionContext) {
  return forward("DELETE", request, ctx);
}
