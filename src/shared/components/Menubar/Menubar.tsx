"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

Menubar.displayName = "Menubar";

export { Menubar };
