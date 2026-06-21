type Props = {
  name: string;
  createdAt: string | Date;
};

export function ProfileHeader({ name, createdAt }: Props) {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt));

  return (
    <div>
      <h1 className="font-semibold text-3xl tracking-tight">{name}</h1>
      <p className="mt-1 text-muted-foreground text-sm">Membro desde {formatted}</p>
    </div>
  );
}
