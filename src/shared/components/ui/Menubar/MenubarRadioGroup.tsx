"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import type * as React from "react";

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  );
}

MenubarRadioGroup.displayName = "MenubarRadioGroup";

export { MenubarRadioGroup };
