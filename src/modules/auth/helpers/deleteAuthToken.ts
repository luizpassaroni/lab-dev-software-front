import { cookies } from "next/headers"

export async function deleteAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
