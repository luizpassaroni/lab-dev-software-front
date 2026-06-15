"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-semibold text-lg leading-none", className)}
      {...props}
    />
  );
}

DialogTitle.displayName = "DialogTitle";

export { DialogTitle };
