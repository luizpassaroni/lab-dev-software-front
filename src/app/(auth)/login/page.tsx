import { Alert, AlertDescription } from "@shared/components/ui/Alert";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/modules/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ just_registered?: string }>;
}) {
  const { just_registered } = await searchParams;
  const justRegistered = just_registered === "1";

  return (
    <div className="animate-auth-rise rounded-xl border bg-card/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
      <div className="mb-7 flex flex-col items-center gap-4 text-center">
        <Image
          src="/images/logo.svg"
          alt="Plot Twist"
          width={72}
          height={44}
          priority
        />
        <div className="flex flex-col gap-1.5">
          <h1 className="font-semibold text-2xl tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-balance text-muted-foreground text-sm">
            Entre para continuar descobrindo onde assistir.
          </p>
        </div>
      </div>

      {justRegistered ? (
        <Alert className="mb-4 border-primary/30 text-foreground">
          <AlertDescription>Conta criada — faça login.</AlertDescription>
        </Alert>
      ) : null}

      <LoginForm />

      <p className="mt-6 text-center text-muted-foreground text-sm">
        Não tem conta?{" "}
        <Link
          href="/cadastro"
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}
