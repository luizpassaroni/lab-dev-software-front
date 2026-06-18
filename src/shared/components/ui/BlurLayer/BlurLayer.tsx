import { cn } from "@shared/lib/cn";
import type * as React from "react";

type BlurPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left-center"
  | "right-center"
  | "center";

type BlurColor = "primary";

type BlurLayerProps = React.ComponentProps<"div"> & {
  size?: number;
  variant?: "soft" | "strong";
  position?: BlurPosition;
  color?: BlurColor;
  offsetClassName?: string;
};

const POSITION_CLASSES: Record<BlurPosition, string> = {
  "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  "bottom-left": "bottom-0 left-0 -translate-x-1/3 translate-y-1/3",
  "bottom-right": "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
  "left-center": "top-1/2 left-0 -translate-x-1/3 -translate-y-1/2",
  "right-center": "top-1/2 right-0 translate-x-1/3 -translate-y-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const COLOR_CLASSES: Record<BlurColor, string> = {
  primary:
    "bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/10 dark:to-primary/20",
};

function BlurLayer({
  className,
  size = 160,
  variant = "soft",
  position = "top-right",
  color = "primary",
  offsetClassName,
  style,
  ...props
}: BlurLayerProps) {
  const dimension = `${size}px`;
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full will-change-transform",
        POSITION_CLASSES[position],
        COLOR_CLASSES[color],
        variant === "soft" && "blur-xl",
        variant === "strong" && "blur-2xl",
        offsetClassName,
        className,
      )}
      style={{ width: dimension, height: dimension, ...style }}
      {...props}
    />
  );
}

BlurLayer.displayName = "BlurLayer";

export { BlurLayer };
