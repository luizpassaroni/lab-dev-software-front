"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

import { TooltipProvider } from "./TooltipProvider";

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
