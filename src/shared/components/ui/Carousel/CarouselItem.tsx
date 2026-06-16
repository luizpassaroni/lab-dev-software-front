"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { useCarousel } from "./CarouselContext";

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

CarouselItem.displayName = "CarouselItem";

export { CarouselItem };
