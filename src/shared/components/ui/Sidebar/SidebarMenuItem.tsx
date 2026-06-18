"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };
