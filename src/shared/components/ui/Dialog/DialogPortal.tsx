"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

DialogPortal.displayName = "DialogPortal";

export { DialogPortal };
