"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

TabsList.displayName = "TabsList";

export { TabsList };
