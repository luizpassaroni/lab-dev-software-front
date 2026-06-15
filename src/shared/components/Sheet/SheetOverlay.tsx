import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      {...props}
    />
  );
}

SheetOverlay.displayName = "SheetOverlay";

export { SheetOverlay };
