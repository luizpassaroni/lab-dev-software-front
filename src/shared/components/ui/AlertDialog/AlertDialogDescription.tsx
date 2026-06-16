import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

AlertDialogDescription.displayName = "AlertDialogDescription";

export { AlertDialogDescription };
