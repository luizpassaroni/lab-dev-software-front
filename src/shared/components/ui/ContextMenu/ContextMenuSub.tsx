"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import type * as React from "react";

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

ContextMenuSub.displayName = "ContextMenuSub";

export { ContextMenuSub };
