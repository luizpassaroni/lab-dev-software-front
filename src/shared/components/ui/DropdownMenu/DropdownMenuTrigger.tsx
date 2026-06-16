"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export { DropdownMenuTrigger };
