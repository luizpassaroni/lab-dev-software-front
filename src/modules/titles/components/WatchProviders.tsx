import { PlayIcon } from "lucide-react";
import type {
  TProvider,
  TTitleDetail,
} from "@/modules/titles/types/TTitleDetail";

const CATEGORIES: {
  key: keyof TTitleDetail["providers"];
  label: string;
  highlight?: boolean;
}[] = [
  { key: "flatrate", label: "Incluído na assinatura", highlight: true },
  { key: "rent", label: "Alugar" },
  { key: "buy", label: "Comprar" },
];

function ProviderItem({ provider }: { provider: TProvider }) {
  return (
    <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2">
      <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded bg-muted">
        {provider.logoUrl ? (
          <img
            src={provider.logoUrl}
            alt={provider.name}
            width={32}
            height={32}
            className="size-full object-cover"
          />
        ) : (
          <PlayIcon className="size-4 text-muted-foreground" />
        )}
      </div>
      <span className="font-medium text-sm">{provider.name}</span>
    </div>
  );
}

export function WatchProviders({
  providers,
}: {
  providers: TTitleDetail["providers"];
}) {
  const hasAny = CATEGORIES.some(({ key }) => providers[key].length > 0);

  return (
    <section className="mt-8">
      <h2 className="mb-4 font-semibold text-xl tracking-tight">
        Onde assistir
      </h2>

      {hasAny ? (
        <div className="flex flex-col gap-4">
          {CATEGORIES.map(({ key, label, highlight }) => {
            const items = providers[key];
            if (items.length === 0) return null;

            return (
              <div key={key} className={highlight ? "" : "opacity-90"}>
                <p
                  className={
                    highlight
                      ? "mb-2 font-medium text-foreground text-sm"
                      : "mb-2 text-muted-foreground text-sm"
                  }
                >
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((provider) => (
                    <ProviderItem key={provider.name} provider={provider} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Sem provedores de streaming disponíveis no Brasil por enquanto.
        </p>
      )}
    </section>
  );
}
