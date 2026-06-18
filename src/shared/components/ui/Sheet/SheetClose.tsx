import * as SheetPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

SheetClose.displayName = "SheetClose";

export { SheetClose };
