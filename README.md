# Plot Twist — Front

Front-end do guia de streaming (Next.js 16 + React 19). O browser fala **só** com
o Next (same-origin `/api/*`); o Next fala com a API Nest server-to-server. Ver
`docs/PRD.md` (§8.1), `CONTEXT.md` e `docs/sprint-1-plan.md`.

## Desenvolvimento

```bash
pnpm install
pnpm dev      # http://localhost:3001
pnpm lint     # Biome
pnpm build
```

## Variáveis de ambiente

Copie `.env.local.example` para `.env.local`. As variáveis do BFF são
**server-only** (sem prefixo `NEXT_PUBLIC_`), então o segredo nunca chega ao
browser:

| Variável | Uso |
|---|---|
| `API_INTERNAL_URL` | URL interna da API Nest (server-to-server) |
| `INTERNAL_API_KEY` | header `X-Internal-Key` em toda chamada Next → Nest |

## Camada de dados (BFF)

Cada chamada do browser passa por um route handler `/api/*`, que injeta os
headers internos e chama o Nest. Enquanto o backend não está configurado
(`API_INTERNAL_URL` ausente), os handlers caem em **mocks de dev** com o mesmo
contrato — trocar para o backend real é só preencher o `.env.local`, sem mudar
código. Exemplo: [`src/modules/auth/queries/register.ts`](src/modules/auth/queries/register.ts).
