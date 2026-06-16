import { NextResponse } from "next/server";
import { registerUser } from "@/modules/auth/queries/register";
import { registerSchema } from "@/modules/auth/schemas/registerSchema";
import { ApiError } from "@/shared/lib/api-error";

/**
 * BFF: `POST /api/auth/register`. The browser calls this same-origin endpoint;
 * the Nest API is reached server-side (with `X-Internal-Key`) by
 * {@link registerUser}. Contract: 201 `{ id, name, email }` | 400 | 409.
 * No `Set-Cookie` — register does not start a session (PRD §8.1).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Requisição inválida." },
      { status: 400 },
    );
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  try {
    const user = await registerUser(parsed.data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { message: "Não foi possível concluir o cadastro agora." },
      { status: 500 },
    );
  }
}
