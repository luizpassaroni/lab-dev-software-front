"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type * as React from "react";

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

DropdownMenuPortal.displayName = "DropdownMenuPortal";

export { DropdownMenuPortal };
