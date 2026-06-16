import { cn } from "@shared/lib/cn";
import type * as React from "react";

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

CardDescription.displayName = "CardDescription";

export { CardDescription };
