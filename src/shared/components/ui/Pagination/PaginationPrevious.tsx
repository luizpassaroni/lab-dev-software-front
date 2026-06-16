import { cn } from "@shared/lib/cn";
import { ChevronLeftIcon } from "lucide-react";
import type * as React from "react";
import { PaginationLink } from "./PaginationLink";

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

export { PaginationPrevious };
