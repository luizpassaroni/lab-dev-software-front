# Guia de Streaming — Frontend

Frontend do Guia de Streaming: webapp para descobrir onde assistir filmes e series no streaming brasileiro. Next.js (App Router) consumindo a API atraves de um BFF (route handlers `/api/*`).

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS

## Setup local

Pre-requisitos: Node 20 (ver `.nvmrc`).

```bash
npm install
cp .env.local.example .env.local   # preencher quando a integracao (FRONT-10) entrar
npm run dev
```

App em http://localhost:3000.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de producao
- `npm run lint` — ESLint

## Estrutura

```
src/
  app/         rotas (App Router)
  components/  componentes reutilizaveis
  services/    chamadas a API e mocks
  hooks/       hooks de React
  types/       contratos da API
```
