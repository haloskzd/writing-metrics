# Writing Metrics

Full-stack TypeScript monorepo.

- **Client** — React + Redux Toolkit, bundled with Vite
- **Server** — Node.js + Apollo Server (GraphQL)
- **Database** — Prisma ORM with SQLite (dev) / PostgreSQL (prod)

---

## First-time setup

```bash
npm install
npm run db:generate --workspace=server   # generate Prisma client types
npm run db:push --workspace=server       # create the local SQLite database
```

---

## Development

### Start the full stack

```bash
npm run dev
```

Starts both services concurrently. Either process exiting will cleanly shut down the other.

| Service | URL |
|---------|-----|
| React app (Vite) | http://localhost:5173 |
| GraphQL API (Apollo) | http://localhost:4000 |
| Apollo Sandbox (browser UI) | http://localhost:4000 |

### Start services individually

```bash
npm run dev --workspace=client   # React + Vite only
npm run dev --workspace=server   # GraphQL server only
```

---

## Database

All database commands run from the repo root with `--workspace=server`.

| Command | What it does |
|---------|-------------|
| `npm run db:generate --workspace=server` | Regenerate the Prisma client after schema changes |
| `npm run db:push --workspace=server` | Sync schema to the database without a migration (good for early dev) |
| `npm run db:migrate --workspace=server` | Create and apply a named migration (use before committing schema changes) |

### Open the database viewer (Prisma Studio)

```bash
npx prisma studio --schema=server/prisma/schema.prisma
```

Opens a browser UI at http://localhost:5555 for browsing and editing database records.

### Switching to PostgreSQL

In `server/prisma/schema.prisma`, change the datasource block:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Update `server/.env` with your Postgres connection string:

```
DATABASE_URL="postgresql://user:password@localhost:5432/writing_metrics"
```

Then run:

```bash
npm run db:migrate --workspace=server
```

---

## TODO

- [ ] Add unit tests for `extractFilterWordFrequency` in `client/src/utils/textAnalysis.test.ts`
- [ ] Add reducer test for `processFilterWords` in `client/src/store/editorSlice.test.ts`
- [ ] Update `extractAdverbFrequency` with a ban list of false postiives

---

## Build

```bash
npm run build
```

Compiles both workspaces (`client/dist` and `server/dist`).

### Run the compiled server

```bash
npm run start --workspace=server
```

---

## Project structure

```
writing-metrics/
├── client/                  # React + Redux frontend
│   ├── src/
│   │   ├── main.tsx         # App entry — Apollo + Redux providers
│   │   ├── App.tsx          # Root component
│   │   ├── store/           # Redux store and slices
│   │   └── graphql/         # GraphQL query definitions
│   └── vite.config.ts       # Vite config — proxies /graphql to port 4000
└── server/                  # Node.js GraphQL backend
    ├── src/
    │   ├── index.ts         # Apollo Server entry point
    │   ├── schema.ts        # GraphQL type definitions
    │   └── resolvers.ts     # GraphQL resolvers
    └── prisma/
        └── schema.prisma    # Database schema
```
