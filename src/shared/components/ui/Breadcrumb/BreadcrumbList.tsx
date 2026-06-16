import { cn } from "@shared/lib/cn";
import type * as React from "react";

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

BreadcrumbList.displayName = "BreadcrumbList";

export { BreadcrumbList };
