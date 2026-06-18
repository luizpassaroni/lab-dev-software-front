"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      {...props}
    />
  );
}

DrawerOverlay.displayName = "DrawerOverlay";

export { DrawerOverlay };
