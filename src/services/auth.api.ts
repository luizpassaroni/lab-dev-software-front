import { http } from "@/services/http";
import type {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from "@/types/api";

export function register(body: RegisterBody): Promise<RegisterResponse> {
  return http<RegisterResponse>("/auth/register", { method: "POST", body });
}

export function login(body: LoginBody): Promise<LoginResponse> {
  return http<LoginResponse>("/auth/login", { method: "POST", body });
}

export function me(): Promise<LoginResponse> {
  return http<LoginResponse>("/auth/me");
}

export function logout(): Promise<void> {
  return http<void>("/auth/logout", { method: "POST" });
}
