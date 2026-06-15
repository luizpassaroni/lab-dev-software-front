import { cn } from "@shared/lib/cn";
import { MoreHorizontalIcon } from "lucide-react";
import type * as React from "react";

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

PaginationEllipsis.displayName = "PaginationEllipsis";

export { PaginationEllipsis };
