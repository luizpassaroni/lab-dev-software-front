"use client";

import { Button } from "@shared/components/ui/Button";
import { Slider } from "@shared/components/ui/Slider";
import { cn } from "@shared/lib/cn";
import { StarIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useRating } from "@/modules/titles/hooks/useRating";

type RatingControlProps = {
  type: string;
  id: string;
  initialRating: number | null;
  isAuthed: boolean;
};

export function RatingControl({
  type,
  id,
  initialRating,
  isAuthed,
}: RatingControlProps) {
  const router = useRouter();
  const { mutate, isPending } = useRating(type, id);
  const [localRating, setLocalRating] = React.useState<number>(
    initialRating ?? 5,
  );
  const [hasRating, setHasRating] = React.useState<boolean>(
    initialRating !== null,
  );
  const [saveAnim, setSaveAnim] = React.useState(false);

  // Sync state if initialRating changes (e.g., after a mutation or data refetch)
  React.useEffect(() => {
    if (initialRating !== null) {
      setLocalRating(initialRating);
      setHasRating(true);
    } else {
      setHasRating(false);
    }
  }, [initialRating]);

  const handleValueChange = (val: number[]) => {
    if (!isAuthed) {
      router.push("/login");
      return;
    }
    setLocalRating(val[0]);
  };

  const handleSave = () => {
    if (!isAuthed) {
      router.push("/login");
      return;
    }
    setSaveAnim(true);
    mutate(localRating, {
      onSuccess: () => {
        setHasRating(true);
      },
    });
  };

  const handleDelete = () => {
    if (!isAuthed) {
      router.push("/login");
      return;
    }
    mutate(null, {
      onSuccess: () => {
        setHasRating(false);
        setLocalRating(5); // Reset back to default
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <StarIcon className="size-5 fill-amber-400 text-amber-400" />
            Avaliação
          </h3>
          <p className="text-muted-foreground text-xs">
            {hasRating
              ? `Você avaliou este título com nota ${localRating} de 10`
              : "Dê uma nota de 1 a 10 para este título"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-2xl font-bold text-primary tabular-nums">
          <span key={localRating} className="inline-block animate-rating-flip">
            {localRating}
          </span>
          <span className="text-muted-foreground text-sm font-normal">
            / 10
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div
          className="px-2 rating-slider"
          onPointerDown={() => {
            if (!isAuthed) {
              router.push("/login");
            }
          }}
        >
          <Slider
            min={1}
            max={10}
            step={1}
            value={[localRating]}
            onValueChange={handleValueChange}
            disabled={isPending}
            className="cursor-pointer"
          />
          <div className="mt-2 flex justify-between text-muted-foreground text-[10px] font-medium px-1 select-none">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {hasRating && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2Icon className="mr-2 size-4" />
              Remover
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isPending || (hasRating && localRating === initialRating)}
            className={cn(
              "[transition:transform_150ms_cubic-bezier(0.16,1,0.3,1),box-shadow_150ms_ease-out] hover:scale-[1.05] hover:shadow-md active:scale-[0.96]",
              saveAnim && "animate-action-pop",
            )}
            onAnimationEnd={() => setSaveAnim(false)}
          >
            {hasRating ? "Atualizar Nota" : "Confirmar Nota"}
          </Button>
        </div>
      </div>
    </div>
  );
}
