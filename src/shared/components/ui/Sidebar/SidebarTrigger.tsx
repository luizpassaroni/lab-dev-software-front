"use client";

import { cn } from "@shared/lib/cn";
import { PanelLeftIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/shared/components/ui/Button";
import { useSidebar } from "./SidebarContext";

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
