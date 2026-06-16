"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

CommandShortcut.displayName = "CommandShortcut";

export { CommandShortcut };
