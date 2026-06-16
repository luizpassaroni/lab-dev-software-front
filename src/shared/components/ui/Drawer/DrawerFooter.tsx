"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

DrawerFooter.displayName = "DrawerFooter";

export { DrawerFooter };
