"use client";

import { Button } from "@shared/components/ui/Button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group rounded-full"
      aria-label="Alternar tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="transition-transform duration-200 group-hover:rotate-45 dark:hidden" />
      <MoonIcon className="hidden transition-transform duration-200 group-hover:-rotate-12 dark:block" />
    </Button>
  );
};

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
