import { cn } from "@shared/lib/cn";
import type * as React from "react";

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

AlertDialogHeader.displayName = "AlertDialogHeader";

export { AlertDialogHeader };
