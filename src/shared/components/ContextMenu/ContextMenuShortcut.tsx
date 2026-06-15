"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

ContextMenuShortcut.displayName = "ContextMenuShortcut";

export { ContextMenuShortcut };
