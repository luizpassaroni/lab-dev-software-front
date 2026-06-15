"use client";

import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

DrawerPortal.displayName = "DrawerPortal";

export { DrawerPortal };
