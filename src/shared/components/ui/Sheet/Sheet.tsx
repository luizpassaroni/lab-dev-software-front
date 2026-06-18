import * as SheetPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

Sheet.displayName = "Sheet";

export { Sheet };
