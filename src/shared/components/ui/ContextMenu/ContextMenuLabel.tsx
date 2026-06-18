"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 font-medium text-foreground text-sm data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

ContextMenuLabel.displayName = "ContextMenuLabel";

export { ContextMenuLabel };
