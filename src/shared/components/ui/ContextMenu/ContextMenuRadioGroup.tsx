"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import type * as React from "react";

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

export { ContextMenuRadioGroup };
