import { cn } from "@shared/lib/cn";
import type * as React from "react";

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

export { BreadcrumbItem };
