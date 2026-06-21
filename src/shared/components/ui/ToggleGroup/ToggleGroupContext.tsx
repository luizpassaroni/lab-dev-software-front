"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import type { toggleVariants } from "@/shared/components/ui/Toggle";

export const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});
