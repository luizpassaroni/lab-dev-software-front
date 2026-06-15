import { cn } from "@shared/lib/cn";
import type * as React from "react";

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold leading-none", className)}
      {...props}
    />
  );
}

CardTitle.displayName = "CardTitle";

export { CardTitle };
