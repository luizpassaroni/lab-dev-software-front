import { Separator } from "@/shared/components/ui/Separator";
import { cn } from "@shared/lib/cn";

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "m-0! relative self-stretch bg-input data-[orientation=vertical]:h-auto",
        className,
      )}
      {...props}
    />
  );
}

ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

export { ButtonGroupSeparator };
