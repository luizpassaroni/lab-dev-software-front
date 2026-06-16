"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
      {...props}
    />
  );
}

SelectLabel.displayName = "SelectLabel";

export { SelectLabel };
