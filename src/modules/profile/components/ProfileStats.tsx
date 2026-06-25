type Totais = { vistos: number; avaliados: number; favoritos: number };

type Props = {
  totais: Totais;
};

export function ProfileStats({ totais }: Props) {
  return (
    <div className="flex overflow-hidden rounded-lg border bg-muted/40">
      <StatCell label="Vistos" value={totais.vistos} />
      <StatCell label="Avaliados" value={totais.avaliados} />
      <StatCell label="Favoritos" value={totais.favoritos} />
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-5 py-3 [&:not(:first-child)]:border-l">
      <span className="text-[1.375rem] font-semibold tabular-nums leading-none">
        {value}
      </span>
      <span className="font-medium text-[0.6875rem] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
