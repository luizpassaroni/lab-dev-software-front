"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

DialogHeader.displayName = "DialogHeader";

export { DialogHeader };
