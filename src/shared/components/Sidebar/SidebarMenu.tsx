"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

SidebarMenu.displayName = "SidebarMenu";

export { SidebarMenu };
