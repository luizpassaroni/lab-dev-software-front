import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SearchResults } from "@/modules/titles/components/SearchResults";

export const metadata: Metadata = {
  title: "Busca",
};

type Props = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const rawQuery = Array.isArray(q) ? q[0] : q;
  const query = rawQuery?.trim();

  if (!query) {
    redirect("/");
  }

  return <SearchResults query={query} />;
}
