import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function CadastroPage() {
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
            Crie sua conta
          </h1>
          <p className="text-balance text-muted-foreground text-sm">
            Descubra onde assistir seus filmes e séries favoritos.
          </p>
        </div>
      </div>

      <RegisterForm />

      <p className="mt-6 text-center text-muted-foreground text-sm">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
