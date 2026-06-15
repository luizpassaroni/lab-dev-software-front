import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

SheetDescription.displayName = "SheetDescription";

export { SheetDescription };
