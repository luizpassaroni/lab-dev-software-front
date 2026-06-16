import { cn } from "@shared/lib/cn";

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("font-medium text-lg tracking-tight", className)}
      {...props}
    />
  );
}

export { EmptyTitle };
