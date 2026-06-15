"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };
