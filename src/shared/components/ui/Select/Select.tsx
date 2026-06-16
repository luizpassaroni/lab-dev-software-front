"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type * as React from "react";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

Select.displayName = "Select";

export { Select };
