"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

MenubarSeparator.displayName = "MenubarSeparator";

export { MenubarSeparator };
