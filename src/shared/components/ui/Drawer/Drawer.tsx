"use client";

import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

Drawer.displayName = "Drawer";

export { Drawer };
