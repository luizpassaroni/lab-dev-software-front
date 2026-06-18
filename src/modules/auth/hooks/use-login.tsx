"use client";

import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/modules/auth/queries/loginRequest";
import type { TAuthUser } from "@/modules/auth/types/TAuthUser";
import type { TLoginPayload } from "@/modules/auth/types/TLoginPayload";
import type { ApiError } from "@/shared/lib/api-error";

export function useLogin() {
  return useMutation<TAuthUser, ApiError, TLoginPayload>({
    mutationFn: loginRequest,
  });
}
