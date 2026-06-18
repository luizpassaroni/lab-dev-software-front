"use client";

import { cn } from "@shared/lib/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-75 scroll-py-1 overflow-y-auto overflow-x-hidden",
        className,
      )}
      {...props}
    />
  );
}

CommandList.displayName = "CommandList";

export { CommandList };
