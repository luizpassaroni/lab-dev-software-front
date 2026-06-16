"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import type * as React from "react";

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

MenubarGroup.displayName = "MenubarGroup";

export { MenubarGroup };
