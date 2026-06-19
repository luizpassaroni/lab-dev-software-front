"use client";

import { useSearchTitles } from "@/modules/titles/hooks/useSearchTitles";
import type { TSearchResult } from "@/modules/titles/types/TSearchResult";
import { Badge } from "@shared/components/ui/Badge";
import { Button } from "@shared/components/ui/Button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shared/components/ui/Command";
import { Kbd, KbdGroup } from "@shared/components/ui/Kbd";
import { Spinner } from "@shared/components/ui/Spinner";
import { FilmIcon, SearchIcon, TvIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { query, setQuery, results, isFetching } = useSearchTitles();

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setQuery(null);
  };

  const handleSelect = (result: TSearchResult) => {
    const type = result.tmdbType === "MOVIE" ? "movie" : "tv";

    setOpen(false);
    router.push(`/titulo/${type}/${result.tmdbId}`);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Buscar"
      >
        <SearchIcon className="size-4" />
      </Button>

      <Button
        variant="outline"
        className="hidden h-9 w-64 justify-start gap-2 font-normal text-muted-foreground md:flex"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left text-sm">
          Buscar filmes e séries...
        </span>
        <KbdGroup className="ml-auto">
          <Kbd>⌘+K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Busca"
        description="Busque filmes e séries"
        showCloseButton={false}
      >
        <CommandInput
          placeholder="Buscar filmes e séries..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isFetching && (
            <div className="flex items-center justify-center py-6">
              <Spinner className="size-5" />
            </div>
          )}

          {!isFetching && query.trim() && results.length === 0 && (
            <CommandEmpty>
              Nenhum resultado para &ldquo;{query}&rdquo;.
            </CommandEmpty>
          )}

          {!isFetching && results.length > 0 && (
            <CommandGroup heading="Resultados">
              {results.map((result) => (
                <CommandItem
                  key={`${result.tmdbType}-${result.tmdbId}`}
                  value={`${result.tmdbType}-${result.tmdbId}-${result.title}`}
                  onSelect={() => handleSelect(result)}
                  className="gap-3 py-2"
                >
                  <div className="flex size-10 shrink-0 overflow-hidden rounded-sm bg-muted">
                    {result.posterUrl ? (
                      <img
                        src={result.posterUrl}
                        alt={result.title}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        {result.tmdbType === "MOVIE" ? (
                          <FilmIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <TvIcon className="size-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate font-medium text-sm">
                      {result.title}
                    </span>
                    {result.year && (
                      <span className="text-xs text-muted-foreground">
                        {result.year}
                      </span>
                    )}
                  </div>
                  <Badge variant="secondary" className="ml-auto shrink-0">
                    {result.badge}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

HeaderSearch.displayName = "HeaderSearch";

export { HeaderSearch };
