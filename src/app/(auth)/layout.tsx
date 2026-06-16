import { redirect } from "next/navigation";
import { getAuthToken } from "@/modules/auth/helpers/getAuthToken";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();

  if (token) {
    redirect("/");
  }

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:py-16">
      {/* Cinematic amber glow behind the auth card. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
