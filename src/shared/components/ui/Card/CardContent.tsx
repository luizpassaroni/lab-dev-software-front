import { cn } from "@shared/lib/cn";
import type * as React from "react";

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

CardContent.displayName = "CardContent";

export { CardContent };
