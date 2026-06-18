"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import type * as React from "react";

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

MenubarMenu.displayName = "MenubarMenu";

export { MenubarMenu };
