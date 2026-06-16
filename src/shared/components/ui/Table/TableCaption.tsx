import { cn } from "@shared/lib/cn";

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

TableCaption.displayName = "TableCaption";

export { TableCaption };
