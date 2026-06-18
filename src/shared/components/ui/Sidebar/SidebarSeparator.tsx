"use client";

import { Separator } from "@/shared/components/ui/Separator";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
}

SidebarSeparator.displayName = "SidebarSeparator";

export { SidebarSeparator };
