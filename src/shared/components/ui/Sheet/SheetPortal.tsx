import * as SheetPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

SheetPortal.displayName = "SheetPortal";

export { SheetPortal };
