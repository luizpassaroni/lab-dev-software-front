type Totais = { vistos: number; avaliados: number; favoritos: number };

type Props = {
  totais: Totais;
};

export function ProfileStats({ totais }: Props) {
  return (
    <div className="flex w-full overflow-hidden rounded-lg border bg-muted/40 sm:w-auto">
      <StatCell label="Vistos" value={totais.vistos} />
      <StatCell label="Avaliados" value={totais.avaliados} />
      <StatCell label="Favoritos" value={totais.favoritos} />
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-0.5 px-3 py-3 sm:flex-none sm:px-5 [&:not(:first-child)]:border-l">
      <span className="text-[1.375rem] font-semibold tabular-nums leading-none">
        {value}
      </span>
      <span className="font-medium text-[0.6875rem] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
