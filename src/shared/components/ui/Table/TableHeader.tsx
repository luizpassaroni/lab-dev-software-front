import { cn } from "@shared/lib/cn";

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

TableHeader.displayName = "TableHeader";

export { TableHeader };
