import { cn } from "@shared/lib/cn";
import type * as React from "react";

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

MenubarShortcut.displayName = "MenubarShortcut";

export { MenubarShortcut };
