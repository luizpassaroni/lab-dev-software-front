import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("font-semibold text-lg", className)}
      {...props}
    />
  );
}

AlertDialogTitle.displayName = "AlertDialogTitle";

export { AlertDialogTitle };
