"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@shared/components/ui/InputGroup";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const INPUT_ID = "home-search";

export function HomeSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    if (!query) {
      setError(true);
      document.getElementById(INPUT_ID)?.focus();
      return;
    }
    router.push(`/busca?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          id={INPUT_ID}
          name="q"
          type="search"
          value={value}
          autoComplete="off"
          aria-label="Buscar filme ou série"
          aria-invalid={error}
          placeholder="Buscar filme ou série..."
          onChange={(event) => {
            setValue(event.target.value);
            if (error) {
              setError(false);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" variant="default" size="sm">
            Buscar
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {error ? (
        <p role="alert" className="mt-2 text-destructive text-sm">
          Digite algo para buscar.
        </p>
      ) : null}
    </form>
  );
}
