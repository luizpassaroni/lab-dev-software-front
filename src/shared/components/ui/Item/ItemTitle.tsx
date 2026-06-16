import { cn } from "@shared/lib/cn";

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 font-medium text-sm leading-snug",
        className,
      )}
      {...props}
    />
  );
}

export { ItemTitle };
