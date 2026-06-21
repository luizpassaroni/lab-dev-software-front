type Totais = { vistos: number; avaliados: number; favoritos: number };

type Props = {
  totais: Totais;
};

export function ProfileStats({ totais }: Props) {
  return (
    <div className="flex gap-8">
      <Stat label="Vistos" value={totais.vistos} />
      <Stat label="Avaliados" value={totais.avaliados} />
      <Stat label="Favoritos" value={totais.favoritos} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="font-semibold text-2xl tabular-nums">{value}</p>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
