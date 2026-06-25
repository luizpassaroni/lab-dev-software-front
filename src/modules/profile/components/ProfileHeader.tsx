type Props = {
  name: string;
  createdAt: string | Date;
};

export function ProfileHeader({ name, createdAt }: Props) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt));

  return (
    <div className="flex items-center gap-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-semibold text-lg text-primary-foreground">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="break-words font-semibold text-2xl tracking-tight">
          {name}
        </p>
        <p className="mt-0.5 text-muted-foreground text-xs">
          Membro desde {formatted}
        </p>
      </div>
    </div>
  );
}
