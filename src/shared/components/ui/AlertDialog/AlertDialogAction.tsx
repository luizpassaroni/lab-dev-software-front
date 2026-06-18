import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "@/shared/components/ui/Button";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

AlertDialogAction.displayName = "AlertDialogAction";

export { AlertDialogAction };
