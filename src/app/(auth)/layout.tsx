import { redirect } from "next/navigation"
import { getAuthToken } from "@/modules/auth/helpers/getAuthToken"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = await getAuthToken()

  if (token) {
    redirect("/")
  }

  return <div>{children}</div>
}
