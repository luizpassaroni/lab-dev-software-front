"use client";

import type { toggleVariants } from "@shared/components/Toggle";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

export const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});
