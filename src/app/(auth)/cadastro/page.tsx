import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function CadastroPage() {
  return (
    <div className="animate-auth-rise rounded-xl border bg-card/95 p-6 shadow-sm sm:p-8 dark:bg-card/90">
      <div className="mb-7 flex flex-col items-center gap-4 text-center">
        <Link
          href="/"
          className="group flex items-center gap-3 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label="Ir para a Home"
        >
          <Image
            src="/images/logo.svg"
            alt="Plot Twist"
            width={52}
            height={32}
            className="transition-[filter] dark:invert"
            priority
          />
          <span className="font-display relative font-semibold text-2xl leading-none transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-0 after:w-full after:rounded-full after:bg-accent after:transition-[height] after:duration-200 group-hover:after:h-[2px] group-focus-visible:after:h-[2px]">
            Plot Twist
          </span>
        </Link>
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
