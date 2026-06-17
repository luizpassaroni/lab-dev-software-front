import type { Metadata } from "next";
import { HomeSearch } from "@/modules/titles/components/HomeSearch";

export const metadata: Metadata = {
  title: "Início",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl">
        Onde assistir?
      </h1>
      <p className="mt-3 mb-8 max-w-md text-balance text-muted-foreground sm:text-lg">
        Encontre filmes e séries nos streamings brasileiros.
      </p>

      <HomeSearch />
    </main>
  );
}
