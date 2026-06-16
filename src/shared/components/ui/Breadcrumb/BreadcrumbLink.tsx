import { Slot } from "@radix-ui/react-slot";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}

BreadcrumbLink.displayName = "BreadcrumbLink";

export { BreadcrumbLink };
