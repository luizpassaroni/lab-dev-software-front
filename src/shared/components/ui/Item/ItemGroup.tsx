import { cn } from "@shared/lib/cn";
import type * as React from "react";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  );
}

export { ItemGroup };
