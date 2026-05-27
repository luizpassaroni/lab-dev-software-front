# Sprint 1 — Issues do Frontend

> **Duração:** semanas 2-3 | **Repo:** `lab-dev-software-front`
> **Doc-fonte:** `docs/PRD.md` + `_notas-projeto/sprint-1-plan.md`
> **Total:** 9 issues (2 setup + 4 telas + 1 mock + 1 teste + 1 meta)
> **Como usar:** cada bloco `## ISSUE-FRONT-NN` é uma issue independente no GitHub. Copiar título + corpo. Owner é definido no kickoff (Dia 1).

**Convenções:**

- Labels GitHub a criar: `sprint-1`, `front`, `epic:auth`, `epic:catalogo`, `epic:infra`, `epic:testes`
- Referências `PRD §X` apontam para `docs/PRD.md`
- Branch por issue: `feat/front-NN-slug-curto` (ex: `feat/front-04-cadastro`)
- **Lib de UI** é decisão do time de front (PRD §15 — delegada em 2026-05-24). Issues abaixo não impõem framework; cada tela referencia "componentes da lib escolhida".

**Contratos da API** (resumo — fonte autoritativa: `docs/contratos-api-s1.md` no repo back após o kickoff):

- `POST /auth/register` → req `{ name, email, password }` → 201 `{ id, name, email }` | 400 | 409
- `POST /auth/login` → req `{ email, password }` → 200 `{ access_token, user }` | 401 | 429
- `GET /titles/search?q&page` → 200 `{ results, page, totalPages, hasMore }` | 502

---

## ISSUE-FRONT-01 — [infra] Estrutura base do app (App Router + layout global + header)

**Labels:** `sprint-1` `front` `epic:infra`
**US:** — (pré-requisito de todas as telas)
**Depende de:** Sprint 0 — scaffold Next.js concluído

### Contexto

Sprint 0 entrega o `npx create-next-app` rodando. Esta issue define a estrutura base que todas as 4 telas vão consumir: layout global (`app/layout.tsx`), header com logo + slot de auth (login/logout) + slot de busca, e a estrutura de pastas (`app/`, `src/components/`, `src/services/`, `src/hooks/`).

### Critérios de aceite

- [ ] `app/layout.tsx` define `<html>`, `<body>` e renderiza o `<Header />` global
- [ ] `src/components/Header.tsx` tem: logo (placeholder textual OK por enquanto — "Guia de Streaming"), barra de busca (componente reusável também consumido pela Home — ver ISSUE-FRONT-05), e slot de auth que renderiza "Entrar / Cadastrar" se deslogado ou "Sair" se logado (estado lido do hook da ISSUE-FRONT-07)
- [ ] Estrutura de pastas criada: `src/components/`, `src/services/`, `src/hooks/`, `src/types/`
- [ ] `src/types/api.ts` define os tipos TypeScript dos 3 contratos (`RegisterRequest`, `RegisterResponse`, `LoginRequest`, `LoginResponse`, `SearchResult`, `SearchResponse`) — fonte: contratos do kickoff
- [ ] Variável `NEXT_PUBLIC_API_BASE_URL` em `.env.local.example` (default `http://localhost:3001`)
- [ ] App roda com `npm run dev`; abrir `http://localhost:3000` mostra header + página em branco (sem erro de hidratação)

---

## ISSUE-FRONT-02 — [infra] Mock plan — `src/services/auth.mock.ts` + `src/services/titles.mock.ts`

**Labels:** `sprint-1` `front` `epic:infra`
**US:** — (mitigação PRD §14 — anti-bloqueio)
**Depende de:** ISSUE-FRONT-01 (estrutura de pastas)

### Contexto

PRD §14 e sprint-1-plan §"Mock plan" definem: front não espera o back. Cada tela é desenvolvida contra mocks locais que retornam **exatamente** o JSON dos contratos. Quando o back termina um endpoint, troca-se só a URL. Esta issue cria a infra de mock que as telas vão consumir.

### Critérios de aceite

- [ ] `src/services/auth.mock.ts` exporta `registerMock(body)` e `loginMock(body)` retornando promises que resolvem com o payload exato dos contratos (ver sprint-1-plan §"Mock plan")
- [ ] `src/services/auth.mock.ts` simula erros via input controlado: email `'duplicado@teste.com'` rejeita com 409; senha `'errada'` rejeita com 401; email `'rate-limit@teste.com'` rejeita com 429
- [ ] `src/services/titles.mock.ts` exporta `searchMock(q, page)` que retorna 3-5 resultados fixos (mix filme + série) com `posterUrl` real da TMDB (URLs públicas de imagem — ex: Oppenheimer, Breaking Bad, Inception); paginação simulada (`totalPages: 3`, `hasMore: page < 3`)
- [ ] `src/services/auth.api.ts` e `src/services/titles.api.ts` criados em paralelo, **com a mesma assinatura** dos mocks, chamando `fetch` em `NEXT_PUBLIC_API_BASE_URL` (podem ficar com `throw new Error('not implemented')` até a integração — Dia 8)
- [ ] README do front documenta numa seção curta: "Para trocar mock por endpoint real, importar de `./auth.api` em vez de `./auth.mock`. Assinatura idêntica — troca de 1 linha."

---

## ISSUE-FRONT-03 — [auth] Tela Cadastro (`/cadastro`)

**Labels:** `sprint-1` `front` `epic:auth`
**US:** US-1.1 (PRD §6)
**Depende de:** ISSUE-FRONT-01, ISSUE-FRONT-02

### Contexto

Formulário de criação de conta. Validação inline campo a campo (sem esperar submit). Em sucesso, redireciona para `/login` com mensagem flash "Conta criada — faça login". Em 409, mostra erro abaixo do campo email.

### Contrato consumido

`POST /auth/register` — ver topo do arquivo.

### Critérios de aceite

- [ ] Rota `/cadastro` (ou `/register` — alinhar com decisão do time de front; documentar a escolha no README)
- [ ] Form com 3 campos: `name` (text), `email` (email), `password` (password)
- [ ] Validação inline (on blur ou on change com debounce):
  - `name`: trim + 2-60 caracteres; mensagem "Nome deve ter entre 2 e 60 caracteres"
  - `email`: regex simples; mensagem "Email inválido"
  - `password`: ≥ 8 caracteres; mensagem "Senha deve ter ao menos 8 caracteres"
- [ ] Botão "Criar conta" desabilitado enquanto qualquer campo estiver inválido ou request pendente
- [ ] Em 201 → redirect para `/login?just_registered=1`; tela de login lê esse query param e mostra flash "Conta criada — faça login"
- [ ] Em 409 → erro abaixo do campo email: "Este email já está cadastrado. [Fazer login →](/login)"
- [ ] Em 400 (não deve acontecer se validação inline funcionar, mas defensivo) → erro genérico no topo do form
- [ ] Link "Já tenho conta" abaixo do form → `/login`
- [ ] Consome `registerMock` da ISSUE-FRONT-02; troca para `register` real no Dia 8

---

## ISSUE-FRONT-04 — [auth] Tela Login (`/login`)

**Labels:** `sprint-1` `front` `epic:auth`
**US:** US-1.2 (PRD §6)
**Depende de:** ISSUE-FRONT-01, ISSUE-FRONT-02, ISSUE-FRONT-07 (hook de auth — pode ir em paralelo)

### Contexto

Form de login. Em sucesso, persiste `access_token` no `localStorage` (chave `auth_token`) + dados do user (chave `auth_user` como JSON) e redireciona para a Home (`/`). Em 401, mostra "Email ou senha inválidos" (genérico — não revela qual). Em 429, mostra "Muitas tentativas, aguarde alguns minutos".

### Contrato consumido

`POST /auth/login` — ver topo do arquivo.

### Critérios de aceite

- [ ] Rota `/login`
- [ ] Form com 2 campos: `email`, `password`
- [ ] Validação mínima inline: ambos os campos não-vazios (sem checar regex de email aqui — back valida; UX preferível: deixar o usuário tentar mesmo com email "estranho")
- [ ] Em sucesso (200) → chama `auth.login(access_token, user)` do hook da FRONT-07 → redirect para `/`
- [ ] Em 401 → erro acima do form: "Email ou senha inválidos."
- [ ] Em 429 → erro acima do form: "Muitas tentativas, aguarde alguns minutos."
- [ ] Em 5xx / erro de rede → erro genérico "Não foi possível entrar agora. Tente novamente." + botão "Tentar de novo"
- [ ] Se `?just_registered=1` na URL → flash discreto no topo: "Conta criada — faça login."
- [ ] Link "Criar conta" abaixo do form → `/cadastro`
- [ ] Consome `loginMock` da FRONT-02; troca para `login` real no Dia 8

---

## ISSUE-FRONT-05 — [catalogo] Tela Home (`/`) com barra de busca

**Labels:** `sprint-1` `front` `epic:catalogo`
**US:** US-2.1 (PRD §6)
**Depende de:** ISSUE-FRONT-01

### Contexto

Home minimalista da Sprint 1: header global (já tem busca via FRONT-01) + corpo com mensagem de boas-vindas + segunda barra de busca centralizada (mais proeminente, estilo Google). **Sem destaques, sem chips de gênero, sem nada de "carrosséis"** — tudo isso é Sprint 3. Ao submeter, navega para `/busca?q=<query>`.

### Critérios de aceite

- [ ] Rota `/` (root)
- [ ] Corpo da home: título grande "Onde assistir?" + subtítulo curto "Encontre filmes e séries nos streamings brasileiros" + barra de busca centralizada com placeholder "Buscar filme ou série..."
- [ ] Submeter a busca (Enter ou clique no botão) → navega para `/busca?q=<query-encoded>` via `useRouter` (Next.js client component) ou `<form action="/busca">` (server component — escolha do dev)
- [ ] Query vazia → não navega; foca no input com mensagem inline "Digite algo para buscar"
- [ ] Estado vazio sem busca: a própria home **é** o estado vazio — não precisa de mensagem extra
- [ ] **Sem destaques, sem chips, sem grade de gêneros** nesta sprint (Sprint 3 — não adiantar)

---

## ISSUE-FRONT-06 — [catalogo] Tela Resultados (`/busca`) com cards + "Carregar mais"

**Labels:** `sprint-1` `front` `epic:catalogo`
**US:** US-2.1 (PRD §6)
**Depende de:** ISSUE-FRONT-01, ISSUE-FRONT-02

### Contexto

Lista de resultados de busca. Lê `q` da query string, chama `/titles/search`, renderiza grade de cards (poster + título + ano + badge "Filme" / "Série"). Botão "Carregar mais" no rodapé incrementa `page` e acumula resultados. Esconde botão quando `hasMore === false`.

### Contrato consumido

`GET /titles/search?q&page` — ver topo do arquivo.

### Critérios de aceite

- [ ] Rota `/busca` lê `q` (obrigatório) e `page` (opcional, default 1) da query string
- [ ] `q` ausente ou vazio → redirect para `/`
- [ ] Chama `searchMock(q, 1)` ao montar; estado inicial: `loading`
- [ ] Grade responsiva de cards (CSS Grid ou Flexbox — escolha do dev); cada card tem:
  - Poster (`<img>` com `posterUrl`; fallback discreto "sem imagem" se `null`)
  - Título
  - Ano (entre parênteses ou abaixo do título)
  - Badge visual distinguindo "Filme" vs "Série" (cor/ícone — escolha do dev de UI)
- [ ] Card clicável (`<Link>` para `/titulo/${tmdbType}/${tmdbId}` — rota da Sprint 2; por ora pode apontar para `#` ou logar no console)
- [ ] Estado `0 resultados`: ícone discreto + texto "Nenhum resultado para '<query>'. Tente outro termo." (PRD §6 US-2.1)
- [ ] Botão "Carregar mais" no rodapé:
  - Visível apenas se `hasMore === true`
  - Clique chama `searchMock(q, page + 1)` e **acumula** ao array existente (não substitui)
  - Texto muda para "Carregando..." enquanto request pendente; desabilitado nesse estado
  - Esconde quando `hasMore === false`
- [ ] Estado de erro (502 ou rede): mensagem "Não foi possível buscar agora. Tente novamente." + botão "Tentar de novo" que refaz a chamada
- [ ] Consome `searchMock` da FRONT-02; troca para `search` real no Dia 8

---

## ISSUE-FRONT-07 — [auth] Hook `useAuth` + botão Logout no header

**Labels:** `sprint-1` `front` `epic:auth`
**US:** US-1.3 (PRD §6) + suporte a US-1.2
**Depende de:** ISSUE-FRONT-01

### Contexto

Estado de autenticação compartilhado entre todas as telas. Hook `useAuth()` lê/grava `localStorage` (chaves `auth_token` e `auth_user`). Logout (US-1.3) é só client-side — apaga as chaves e redireciona para `/`. Decisão PRD §15: sem chamada ao back, sem blocklist no MVP.

### Critérios de aceite

- [ ] `src/hooks/useAuth.ts` exporta hook que retorna `{ user, token, isAuthenticated, login(token, user), logout() }`
- [ ] `login(token, user)` grava `auth_token` e `auth_user` no `localStorage` e atualiza estado interno
- [ ] `logout()` apaga `auth_token` e `auth_user` do `localStorage`, zera estado e navega para `/` via `useRouter`
- [ ] Estado inicial lê do `localStorage` na montagem (cuidado com SSR — usar `useEffect` ou `'use client'`)
- [ ] No header (FRONT-01): se `isAuthenticated`, mostra "Olá, {user.name}" + botão "Sair"; senão mostra "Entrar" e "Cadastrar"
- [ ] Botão "Sair" chama `logout()` — sem confirmação extra (PRD US-1.3)
- [ ] **Token de 24h expirou** → próxima request protegida volta 401; **front trata 401 global** redirecionando para `/login` (Sprint 2 vai ter requests protegidas; nesta sprint, garantir só que o helper `fetch` está pronto para isso — middleware ou wrapper em `src/services/http.ts`)
- [ ] Token **nunca** vai pro `console.log` nem pro `console.error` em código de produção

---

## ISSUE-FRONT-08 — [test] 2-3 testes de componente simbólicos (PRD §8)

**Labels:** `sprint-1` `front` `epic:testes`
**US:** — (PRD §8 — testes simbólicos como item de rubrica)
**Depende de:** ISSUE-FRONT-04 (Login), ISSUE-FRONT-06 (Resultados)

### Contexto

PRD §8: "Front — sem testes funcionais profundos no MVP — apenas **testes simbólicos** (2-3 testes de componente) como prática educativa e item visível na rubrica acadêmica." Validação principal fica com QA manual. Esta issue cria a infra mínima de teste + escreve os 2-3 testes.

### Critérios de aceite

- [ ] Vitest **ou** Jest configurado no front (escolha do dev — Vitest é mais natural em Next.js moderno)
- [ ] `@testing-library/react` instalado
- [ ] **Teste 1:** `LoginForm.test.tsx` → renderiza o form, preenche email e senha, clica em "Entrar", verifica que `loginMock` foi chamado com `{ email, password }` corretos
- [ ] **Teste 2:** `ResultCard.test.tsx` → renderiza um card com mock de resultado tipo `MOVIE`, verifica que o badge mostra "Filme"; renderiza com `TV`, verifica badge "Série"
- [ ] **Teste 3 (opcional, se sobrar tempo):** `Header.test.tsx` → mocka `useAuth` retornando `isAuthenticated: false`, verifica presença dos links "Entrar" e "Cadastrar"; mocka como `true`, verifica presença do botão "Sair"
- [ ] `npm test` no front roda e passa (e roda no CI — PRD §8)
- [ ] `npm run build` continua passando no CI

---

## ISSUE-FRONT-09 — [meta] Mensagens de erro & loading consistentes em todas as telas

**Labels:** `sprint-1` `front` `epic:infra`
**US:** — (PRD §8 — tratamento de erros na UI)
**Depende de:** ISSUE-FRONT-03, ISSUE-FRONT-04, ISSUE-FRONT-06 (revisa as 3 telas)

### Contexto

PRD §8 define o padrão de tratamento de erros na UI: mensagem genérica + botão "Tentar de novo" para falha de rede / 5xx / timeout. Telas individuais (FRONT-03/04/06) implementam o próprio; esta issue audita as 3 e garante que **a mesma mensagem e o mesmo componente** sejam usados em todas. Evita 3 versões diferentes de "Tentar de novo".

### Critérios de aceite

- [ ] `src/components/ErrorState.tsx` componente reusável com props `{ message, onRetry }` — exibe ícone + texto + botão
- [ ] `src/components/LoadingState.tsx` componente reusável — exibe spinner ou skeleton (escolha do dev)
- [ ] Auditadas as 3 telas (Cadastro, Login, Resultados): cada uma usa `<ErrorState />` e `<LoadingState />` em vez de markup ad-hoc
- [ ] Mensagens textuais padronizadas:
  - Rede / 5xx / timeout: "Não foi possível carregar agora. Tente novamente."
  - 0 resultados (busca): "Nenhum resultado para '<query>'. Tente outro termo."
  - 401 (login): "Email ou senha inválidos."
  - 409 (cadastro): "Este email já está cadastrado."
  - 429 (login): "Muitas tentativas, aguarde alguns minutos."
- [ ] Decisão sobre lib de toast/snackbar fica com o time de front (FRONT pode usar inline ou toast — desde que seja consistente)
