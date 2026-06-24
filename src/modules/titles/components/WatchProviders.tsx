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

function ProviderItem({
  provider,
  highlight,
}: {
  provider: TProvider;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "flex items-center gap-2 rounded-md border border-primary/30 bg-accent/35 px-3 py-2 shadow-xs transition-[border-color,background-color,box-shadow] duration-200 ease-out hover:border-primary/45 hover:bg-accent/45 hover:shadow-sm"
          : "flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted/70 hover:text-foreground"
      }
    >
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
    <section className="mt-8 rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="mb-1 font-semibold text-xl tracking-tight">
        Onde assistir
      </h2>
      <p className="mb-4 text-muted-foreground text-sm">
        Streaming brasileiro disponível pela TMDB.
      </p>

      {hasAny ? (
        <div className="flex flex-col gap-4">
          {CATEGORIES.map(({ key, label, highlight }) => {
            const items = providers[key];
            if (items.length === 0) return null;

            return (
              <div key={key} className={highlight ? "" : "opacity-85"}>
                <p className="mb-2 flex items-center gap-2 font-medium text-sm">
                  {highlight ? (
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-primary"
                    />
                  ) : null}
                  <span
                    className={
                      highlight ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {label}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((provider) => (
                    <ProviderItem
                      key={provider.name}
                      provider={provider}
                      highlight={highlight}
                    />
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
