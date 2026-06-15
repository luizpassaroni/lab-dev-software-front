"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type * as React from "react";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

Popover.displayName = "Popover";

export { Popover };
