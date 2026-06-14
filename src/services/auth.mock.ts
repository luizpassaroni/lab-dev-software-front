import { HttpError } from "@/services/http";
import type {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from "@/types/api";

const DELAY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY_MS));
}

export async function register(body: RegisterBody): Promise<RegisterResponse> {
  if (body.email === "duplicado@teste.com") {
    throw new HttpError(409, "Email ja cadastrado.");
  }
  return delay({ id: 2, name: body.name, email: body.email });
}

export async function login(body: LoginBody): Promise<LoginResponse> {
  if (body.email === "rate-limit@teste.com") {
    throw new HttpError(429, "Muitas tentativas. Tente novamente em instantes.");
  }
  if (body.password === "errada") {
    throw new HttpError(401, "Email ou senha invalidos.");
  }
  return delay({
    user: {
      id: 1,
      name: "Usuario Teste",
      email: body.email,
      createdAt: new Date().toISOString(),
    },
  });
}

export async function me(): Promise<LoginResponse> {
  return delay({
    user: {
      id: 1,
      name: "Usuario Teste",
      email: "teste@teste.com",
      createdAt: new Date().toISOString(),
    },
  });
}

export async function logout(): Promise<void> {
  await delay(null);
}
