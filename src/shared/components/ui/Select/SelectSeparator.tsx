"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

SelectSeparator.displayName = "SelectSeparator";

export { SelectSeparator };
