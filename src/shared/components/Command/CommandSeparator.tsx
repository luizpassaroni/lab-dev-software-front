"use client";

import { cn } from "@shared/lib/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  );
}

CommandSeparator.displayName = "CommandSeparator";

export { CommandSeparator };
