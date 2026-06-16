"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 font-medium text-sm data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

MenubarLabel.displayName = "MenubarLabel";

export { MenubarLabel };
