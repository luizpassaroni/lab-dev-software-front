import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

SheetHeader.displayName = "SheetHeader";

export { SheetHeader };
