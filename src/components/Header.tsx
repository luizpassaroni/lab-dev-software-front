import Link from "next/link";

import { SearchBar } from "@/components/SearchBar";

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight">
          Guia de Streaming
        </Link>

        <div className="flex-1">
          <SearchBar />
        </div>

        <nav className="flex shrink-0 items-center gap-3 text-sm">
          <Link
            href="/login"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-full bg-zinc-900 px-3 py-1.5 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
