"use client";

import { cn } from "@shared/lib/cn";
import type * as React from "react";
import { useCarousel } from "./CarouselContext";

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

CarouselContent.displayName = "CarouselContent";

export { CarouselContent };
