"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

DrawerTitle.displayName = "DrawerTitle";

export { DrawerTitle };
