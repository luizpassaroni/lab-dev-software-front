import { RegisterBody, RegisterResponse, LoginBody, LoginResponse } from '@/types/api';
import { apiFetch } from './http';

export async function register(body: RegisterBody): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>('/auth/register', { method: 'POST', body });
}

export async function login(body: LoginBody): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', { method: 'POST', body });
}

export async function me(): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/me');
}

export async function logout(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
}