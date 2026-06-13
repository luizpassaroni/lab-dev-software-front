import { RegisterBody, RegisterResponse, LoginBody, LoginResponse, User } from '@/types/api';

const mockUser: User = {
  id: 1,
  name: 'Usuário Teste',
  email: 'teste@email.com',
  createdAt: new Date().toISOString(),
};

export async function register(body: RegisterBody): Promise<RegisterResponse> {
  await delay();
  if (body.email === 'duplicado@teste.com') {
    throw Object.assign(new Error('E-mail já cadastrado'), { status: 409 });
  }
  return { user: { id: 1, name: body.name, email: body.email, createdAt: new Date().toISOString() } };
}

export async function login(body: LoginBody): Promise<LoginResponse> {
  await delay();
  if (body.email === 'rate-limit@teste.com') {
    throw Object.assign(new Error('Muitas tentativas'), { status: 429 });
  }
  if (body.password === 'errada') {
    throw Object.assign(new Error('Credenciais incorretas'), { status: 401 });
  }
  return { user: { ...mockUser, email: body.email } };
}

export async function me(): Promise<LoginResponse> {
  await delay();
  return { user: mockUser };
}

export async function logout(): Promise<void> {
  await delay();
  // 204 — sem payload
}

function delay(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}