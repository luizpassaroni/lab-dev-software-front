import { Separator } from "@/shared/components/ui/Separator";
import { cn } from "@shared/lib/cn";

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  );
}

export { ItemSeparator };
