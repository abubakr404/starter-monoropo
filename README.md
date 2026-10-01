# Stater

A production-ready full-stack starter template for developers who want to ship fast.

**Turborepo** monorepo · **NestJS** backend with **CQRS** · **Next.js** frontend · **Prisma** + **PostgreSQL** · **Tailwind CSS** + **shadcn/ui** atomic design

## Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo + pnpm workspaces |
| Backend | NestJS, CQRS, JWT Auth, Swagger |
| Database | Prisma ORM, PostgreSQL |
| Frontend | Next.js 15, React 19, Tailwind CSS 4 |
| UI | shadcn/ui components, atomic design |
| Tooling | ESLint, Prettier, TypeScript |

## Project Structure

```
stater/
├── apps/
│   ├── api/          # NestJS backend (CQRS)
│   └── web/          # Next.js frontend
├── packages/
│   ├── database/     # Prisma schema & client
│   ├── ui/           # Shared UI (atomic design)
│   ├── eslint-config/
│   └── typescript-config/
├── modules/          # Optional backend modules
├── scripts/          # CLI utilities
└── stater.config.ts  # Feature toggles
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for PostgreSQL)

### Setup

```bash
# Clone and install
pnpm install

# Start PostgreSQL
docker compose up -d postgres

# Configure environment
cp .env.example .env

# Generate Prisma client & push schema
pnpm db:generate
pnpm db:push

# Start development
pnpm dev
```

- **Web**: http://localhost:3000
- **API**: http://localhost:3001
- **Swagger**: http://localhost:3001/docs

## Atomic Design (UI)

Components live in `@stater/ui` organized by complexity:

```
packages/ui/src/
├── atoms/       # Button, Input, Label, Badge, Avatar
├── molecules/   # Card, FormField, Switch, ThemeToggle
├── organisms/   # Header, Sidebar, DataTable
└── templates/   # AuthLayout, DashboardLayout
```

Import from the package:

```tsx
import { Button } from "@stater/ui/atoms/button";
import { DashboardLayout } from "@stater/ui/templates/dashboard-layout";
```

## CQRS Pattern (Backend)

Each feature module follows command/query separation:

```
modules/users/
├── commands/
│   ├── update-user.command.ts
│   └── update-user.handler.ts
├── queries/
│   ├── get-users.query.ts
│   └── get-users.handler.ts
├── dto/
├── users.controller.ts
└── users.module.ts
```

**Commands** mutate state. **Queries** read state. Controllers dispatch via `CommandBus` and `QueryBus`.

## Optional Modules

Add features on demand:

```bash
pnpm add-module notifications   # In-app notifications
pnpm add-module email           # SMTP email service
pnpm add-module redis-cache     # Redis caching
pnpm add-module file-upload     # File upload (local/S3)
```

Toggle modules in `stater.config.ts`:

```ts
export const staterConfig = {
  modules: {
    auth: true,
    users: true,
    notifications: false,  // enable via add-module
    fileUpload: false,
    email: false,
    redisCache: false,
  },
};
```

## Included Features

### Backend (enabled by default)
- JWT authentication (register, login, profile)
- User CRUD with pagination
- Health check endpoint
- Swagger API documentation
- Global validation pipes
- Rate limiting (Throttler)

### Frontend (enabled by default)
- Landing page
- Auth pages (login, register)
- Dashboard with sidebar navigation
- Users data table
- Dark/light theme toggle
- API client with token management

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all packages |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm add-module <name>` | Install optional module |

## Environment Variables

See `.env.example` for all variables. Key ones:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `API_PORT` | Backend port (default: 3001) |
| `NEXT_PUBLIC_API_URL` | API URL for frontend |

## License

MIT
