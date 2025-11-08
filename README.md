# node_react

Monorepo com API Fastify e frontend React/Vite gerenciados por workspaces do `pnpm`.

## Requisitos

- Node.js 18+
- `pnpm` (recomendado para aproveitar os workspaces)

## Instalação

```bash
pnpm install
```

## Uso

```bash
# Rodar apenas a API (porta 3333)
pnpm run dev:api

# Rodar apenas o frontend (porta definida pelo Vite, normalmente 5173)
pnpm run dev:web

# Rodar API e frontend em paralelo
pnpm run dev
```

Builds individuais:

```bash
pnpm --filter api run build
pnpm --filter web run build
```

## Banco de dados / ORM

- A API usa **Drizzle ORM** com PostgreSQL. As migrations ficam em `api/src/db/migrations`.
- Configure um arquivo `.env` dentro de `api/` contendo ao menos `DATABASE_URL=postgres://usuario:senha@host:porta/db`.

Scripts úteis (execute a partir da raiz):

```bash
# Gerar migrations a partir dos schemas (api/src/db/schema)
pnpm --filter api run db:generate

# Aplicar migrations pendentes no banco configurado
pnpm --filter api run db:migrate

# Abrir o Drizzle Studio (UI para inspecionar dados)
pnpm --filter api run db:studio
```

## Tecnologias

- **API**: Fastify 5, Drizzle ORM (PostgreSQL), Zod type provider, @fastify/swagger, Scalar API Reference, TypeScript.
- **Frontend**: React 19, Vite 7, TypeScript.
- **Tooling**: pnpm workspaces, ESLint, Prettier.

## Estrutura

```
api/  -> Fastify + TypeScript
web/  -> React + Vite
```

Execute os comandos sempre a partir da raiz do repositório para que o `pnpm` resolva cada workspace corretamente.
