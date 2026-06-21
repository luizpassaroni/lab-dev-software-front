import type { Metadata } from "next";
import { HomeDiscover } from "@/modules/titles/components/HomeDiscover";
import { HomeSearch } from "@/modules/titles/components/HomeSearch";

export const metadata: Metadata = {
  title: "Início",
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-start px-4 py-16">
      <HomeSearch />

      <h1 className="mt-10 text-balance text-center font-semibold text-4xl tracking-tight sm:text-5xl">
        Onde assistir?
      </h1>
      <p className="mt-3 max-w-md text-balance text-center text-muted-foreground sm:text-lg">
        Encontre filmes e séries nos streamings brasileiros.
      </p>

      <HomeDiscover />
    </main>
  );
}
