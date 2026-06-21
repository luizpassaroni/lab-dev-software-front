"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { Input } from "@/shared/components/ui/Input";

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
