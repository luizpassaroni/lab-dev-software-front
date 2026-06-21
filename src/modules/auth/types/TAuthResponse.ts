import type { TAuthUser } from "@/modules/auth/types/TAuthUser";

export type TAuthResponse = {
  access_token: string;
  user: TAuthUser;
};
