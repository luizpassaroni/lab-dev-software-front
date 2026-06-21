"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/Sheet";
import { SIDEBAR_WIDTH_MOBILE } from "./SidebarConstants";
import { useSidebar } from "./SidebarContext";

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>
              This is a sidebar for navigation.
            </SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      className={cn(
        "group peer flex h-full w-(--sidebar-width) flex-col border-sidebar-border border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear",
        "data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:overflow-hidden",
        "data-[collapsible=icon]:w-(--sidebar-width-icon)",
        "data-[variant=floating]:rounded-lg data-[variant=floating]:border data-[variant=floating]:border-sidebar-border data-[variant=floating]:shadow",
        "data-[variant=inset]:absolute data-[variant=inset]:top-2 data-[variant=inset]:left-2 data-[variant=inset]:h-[calc(100vh-theme(spacing.4))] data-[variant=inset]:bg-background",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Sidebar.displayName = "Sidebar";

export { Sidebar };
