"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

SidebarFooter.displayName = "SidebarFooter";

export { SidebarFooter };
