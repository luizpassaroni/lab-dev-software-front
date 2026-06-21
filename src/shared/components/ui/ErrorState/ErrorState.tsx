import { Button } from "@shared/components/ui/Button";
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@shared/components/ui/Empty";
import { RotateCwIcon, TriangleAlertIcon } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retrying?: boolean;
};

function ErrorState({
  title = "Não foi possível carregar",
  description = "Não foi possível carregar agora. Tente novamente.",
  onRetry,
  retrying = false,
}: ErrorStateProps) {
  return (
    <>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlertIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {onRetry ? (
        <EmptyContent>
          <Button onClick={onRetry} disabled={retrying}>
            <RotateCwIcon className={retrying ? "animate-spin" : undefined} />
            Tentar de novo
          </Button>
        </EmptyContent>
      ) : null}
    </>
  );
}

export { ErrorState };
export type { ErrorStateProps };
