"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@shared/lib/cn";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

SelectScrollDownButton.displayName = "SelectScrollDownButton";

export { SelectScrollDownButton };
