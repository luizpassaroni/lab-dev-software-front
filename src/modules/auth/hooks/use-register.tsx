"use client";

import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "@/modules/auth/queries/registerRequest";
import type { TRegisterPayload } from "@/modules/auth/types/TRegisterPayload";
import type { TRegisterResponse } from "@/modules/auth/types/TRegisterResponse";
import type { ApiError } from "@/shared/lib/api-error";

export function useRegister() {
  return useMutation<TRegisterResponse, ApiError, TRegisterPayload>({
    mutationFn: registerRequest,
  });
}
