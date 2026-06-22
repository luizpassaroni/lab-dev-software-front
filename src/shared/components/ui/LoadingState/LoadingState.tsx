import { Skeleton } from "@shared/components/ui/Skeleton";
import { cn } from "@shared/lib/cn";

type LoadingStateProps = {
  count?: number;
  className?: string;
};

function LoadingState({ count = 10, className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export { LoadingState };
export type { LoadingStateProps };
