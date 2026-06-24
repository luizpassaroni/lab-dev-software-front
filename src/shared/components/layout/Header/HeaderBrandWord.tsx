"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";

const HeaderBrandWord = () => {
  const isHome = usePathname() === "/";

  return (
    <span
      id="plot-twist-header-target"
      aria-hidden={isHome}
      className={cn(
        "font-display relative ml-2 inline-flex select-none whitespace-nowrap font-semibold text-base leading-none transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-0 after:w-full after:rounded-full after:bg-accent after:transition-[height] after:duration-200 hover:after:h-[2px] sm:ml-3 sm:text-lg",
        isHome ? "text-transparent" : "text-foreground",
      )}
    >
      Plot Twist
    </span>
  );
};

HeaderBrandWord.displayName = "HeaderBrandWord";

export { HeaderBrandWord };
