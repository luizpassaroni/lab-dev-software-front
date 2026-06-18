"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

DrawerDescription.displayName = "DrawerDescription";

export { DrawerDescription };
