"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@shared/lib/cn";
import type * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/Tooltip";
import { useSidebar } from "./SidebarContext";

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  size?: "default" | "sm" | "md" | "lg";
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[variant=inset]:bg-sidebar-accent group-has-data-[variant=inset]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[variant=outline]:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:data-[variant=outline]:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
        "data-[size=lg]:font-normal data-[size=sm]:font-normal data-[size=lg]:text-sm data-[size=sm]:text-xs group-data-[collapsible=icon]:data-[size=lg]:size-9! group-data-[collapsible=icon]:data-[size=md]:size-8! group-data-[collapsible=icon]:data-[size=sm]:size-7!",
        className,
      )}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };
