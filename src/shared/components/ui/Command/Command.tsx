"use client";

import { cn } from "@shared/lib/cn";
import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className,
      )}
      {...props}
    />
  );
}

Command.displayName = "Command";

export { Command };
