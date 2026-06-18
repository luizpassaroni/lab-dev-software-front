import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

SheetTitle.displayName = "SheetTitle";

export { SheetTitle };
