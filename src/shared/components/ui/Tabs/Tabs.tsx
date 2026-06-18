"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

Tabs.displayName = "Tabs";

export { Tabs };
