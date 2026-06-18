import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@shared/lib/cn";
import type * as React from "react";

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      {...props}
    />
  );
}

AvatarFallback.displayName = "AvatarFallback";

export { AvatarFallback };
