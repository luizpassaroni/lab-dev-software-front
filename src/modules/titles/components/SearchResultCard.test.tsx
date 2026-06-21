import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchResultCard } from "@/modules/titles/components/SearchResultCard";

describe("SearchResultCard", () => {
  it("renders movie card with correct badge and link", () => {
    render(
      <SearchResultCard
        result={{
          tmdbId: 1,
          tmdbType: "MOVIE",
          title: "X",
          year: 2020,
          posterUrl: null,
          badge: "Filme",
        }}
      />,
    );
    expect(screen.getByText("Filme")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/titulo/movie/1");
  });

  it("renders TV card with correct badge and link", () => {
    render(
      <SearchResultCard
        result={{
          tmdbId: 1,
          tmdbType: "TV",
          title: "X",
          year: 2020,
          posterUrl: null,
          badge: "Série",
        }}
      />,
    );
    expect(screen.getByText("Série")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/titulo/tv/1");
  });
});
