"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "rounded-md outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}

TabsContent.displayName = "TabsContent";

export { TabsContent };
