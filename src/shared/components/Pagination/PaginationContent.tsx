import { cn } from "@shared/lib/cn";
import type * as React from "react";

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

PaginationContent.displayName = "PaginationContent";

export { PaginationContent };
