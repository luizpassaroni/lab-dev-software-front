import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { buttonVariants } from "@/shared/components/ui/Button";

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

AlertDialogCancel.displayName = "AlertDialogCancel";

export { AlertDialogCancel };
