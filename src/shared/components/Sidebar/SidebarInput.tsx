"use client";

import { Input } from "@shared/components/Input";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
}

SidebarInput.displayName = "SidebarInput";

export { SidebarInput };
