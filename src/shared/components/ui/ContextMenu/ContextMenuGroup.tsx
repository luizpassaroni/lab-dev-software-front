"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import type * as React from "react";

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

ContextMenuGroup.displayName = "ContextMenuGroup";

export { ContextMenuGroup };
