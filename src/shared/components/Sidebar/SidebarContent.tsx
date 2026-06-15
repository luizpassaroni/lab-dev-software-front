"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

SidebarContent.displayName = "SidebarContent";

export { SidebarContent };
