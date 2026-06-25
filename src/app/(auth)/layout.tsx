import { redirect } from "next/navigation";
import { getSessionToken } from "@/modules/auth/helpers/session";
import { ThemeToggle } from "@/shared/components/layout/Header/ThemeToggle";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getSessionToken();

  if (token) {
    redirect("/");
  }

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:py-16">
      <div className="fixed top-3 right-3 z-50">
        <ThemeToggle />
      </div>
      <div aria-hidden="true" className="auth-backdrop">
        <div className="auth-backdrop__wash" />
        <div className="auth-backdrop__beam" />
        <div className="auth-backdrop__panels">
          <div
            className="auth-backdrop__panel"
            style={{ "--i": 0 } as React.CSSProperties}
          />
          <div
            className="auth-backdrop__panel"
            style={{ "--i": 1 } as React.CSSProperties}
          />
          <div
            className="auth-backdrop__panel"
            style={{ "--i": 2 } as React.CSSProperties}
          />
        </div>
        <div className="auth-backdrop__vignette" />
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
