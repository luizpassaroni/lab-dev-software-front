import * as SheetPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

SheetTrigger.displayName = "SheetTrigger";

export { SheetTrigger };
