import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMe } from "@/modules/auth/queries/getMe";
import { ProfileContent } from "@/modules/profile/components/ProfileContent";

export const metadata: Metadata = {
  title: "Perfil",
};

export default async function PerfilPage() {
  const user = await getMe();
  if (!user) {
    redirect("/login");
  }

  return <ProfileContent user={user} />;
}
