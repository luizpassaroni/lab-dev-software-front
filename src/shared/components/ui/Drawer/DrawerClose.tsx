"use client";

import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

DrawerClose.displayName = "DrawerClose";

export { DrawerClose };
