# Plot Twist — Front

Front-end do guia de streaming (Next.js 16 + React 19). O browser fala **só** com
o Next (same-origin `/api/*`); o Next fala com a API Nest server-to-server. Ver
`docs/PRD.md` (§8.1), `CONTEXT.md` e `docs/sprint-1-plan.md`.

> A documentação completa do projeto (back + front, setup do zero num ambiente
> limpo) está no [README do repositório back](https://github.com/luizpassaroni/lab-dev-software-back#readme).

## Funcionalidades

- Cadastro e login com sessão segura (cookie HttpOnly, JWT 24h).
- Busca de filmes e séries (TMDB, em português, região Brasil).
- Descoberta por gênero e "Em alta" na Home.
- Ficha do título: sinopse, elenco, nota TMDB, gêneros, duração/temporadas.
- "Onde assistir" no Brasil: assinatura (flatrate), aluguel e compra.
- Avaliar (nota 1–10), marcar como visto e favoritar títulos.
- Perfil com totais e listas de vistos, avaliados e favoritos.
- Tema claro/escuro e layout responsivo.

## Integrantes

| Nome | RA | Função |
|---|---|---|
| Caio Parada Oliveira Planinschek | 1240205596 | Product Owner, Backend, Frontend |
| João Victor Berçot Chabudet Cabral | 1240108001 | Backend |
| Igor Rocha Lobato | 1240114118 | Backend, Frontend |
| Carlos Matheus Marinho Tavares | 1240119803 | Frontend, Documentação |
| Eduardo de Oliveira Fernandes | 1240104170 | Backend, QA |
| Luiz Felipe de Aguiar Passaroni | 1240114559 | QA |
| Lucas Vasconcelos Tabosa de Almeida | 1250100134 | Documentação |
| Gabriel Albuquerque Varela Santarello | 1240110815 | Documentação, QA |
| Davi Hasson Castro | 1240117220 | Frontend |
| Maria Fernanda Lourenço Class Teixeira | 1240113501 | Documentação, QA |

## Capturas de tela

As telas da aplicação estão documentadas em [`docs/telas/`](docs/telas/), com captura em tema claro e escuro de cada uma das 6 telas.

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

## Produção

| Recurso | URL |
|---|---|
| Front (Vercel) | <https://lab-dev-software-front.vercel.app> |

As variáveis `API_INTERNAL_URL` e `INTERNAL_API_KEY` estão configuradas
**server-side na Vercel** (Production), sem prefixo `NEXT_PUBLIC_` — o segredo
nunca chega ao browser.

## Camada de dados (BFF)

Cada chamada do browser passa por um route handler `/api/*`, que injeta os
headers internos e chama o Nest. Enquanto o backend não está configurado
(`API_INTERNAL_URL` ausente), os handlers caem em **mocks de dev** com o mesmo
contrato — trocar para o backend real é só preencher o `.env.local`, sem mudar
código. Exemplo: [`src/modules/auth/queries/register.ts`](src/modules/auth/queries/register.ts).

## Documentação

- [README do back](https://github.com/luizpassaroni/lab-dev-software-back#readme) — documentação completa do projeto (setup do back + front).
- [Referência da API REST](https://github.com/luizpassaroni/lab-dev-software-back/blob/main/docs/api.md) — endpoints, payloads e autenticação (vive no repo do back).
- [`docs/telas/`](docs/telas/) — capturas e descrição das 6 telas.
- `docs/arquitetura.png` e `docs/banco_de_dados.png` — diagramas de arquitetura e do modelo de dados.
- O relatório acadêmico completo (PDF, template UVA) acompanha a entrega final da disciplina.
