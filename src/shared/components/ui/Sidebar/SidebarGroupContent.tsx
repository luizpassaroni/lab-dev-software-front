"use client";

import { cn } from "@shared/lib/cn";
import * as React from "react";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
));

SidebarGroupContent.displayName = "SidebarGroupContent";

export { SidebarGroupContent };
