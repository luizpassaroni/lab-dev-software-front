import type { Metadata } from "next";
import { HomeBackdrop } from "@/modules/titles/components/HomeBackdrop";
import { HomeBrandFlight } from "@/modules/titles/components/HomeBrandFlight";
import { HomeDiscover } from "@/modules/titles/components/HomeDiscover";
import { HomeSearch } from "@/modules/titles/components/HomeSearch";

export const metadata: Metadata = {
  title: "Início",
};

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-start overflow-hidden px-4 py-12 sm:py-16">
      <HomeBackdrop />
      <HomeBrandFlight />

      <section className="animate-home-rise flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-medium text-muted-foreground text-sm">
          Onde assistir?
        </p>
        <h1
          id="plot-twist-hero-title"
          className="plot-twist-hero-title font-display mt-2 text-balance font-semibold text-6xl text-primary sm:text-7xl"
        >
          Plot Twist
        </h1>
        <p className="mt-4 max-w-xl text-balance text-muted-foreground sm:text-lg">
          Encontre filmes e séries nos streamings brasileiros.
        </p>
      </section>

      <div className="mt-10 w-full">
        <HomeSearch />
      </div>

      <HomeDiscover />
    </main>
  );
}
