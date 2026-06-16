"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
