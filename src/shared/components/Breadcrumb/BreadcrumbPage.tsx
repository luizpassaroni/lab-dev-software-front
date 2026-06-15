import { cn } from "@shared/lib/cn";
import type * as React from "react";

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

BreadcrumbPage.displayName = "BreadcrumbPage";

export { BreadcrumbPage };
