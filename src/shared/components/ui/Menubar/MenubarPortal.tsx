"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import type * as React from "react";

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

MenubarPortal.displayName = "MenubarPortal";

export { MenubarPortal };
