# Optional Backend Modules

Copy a module into `apps/api/src/modules/` and register it in `app.module.ts`.

| Module | Command | Description |
|--------|---------|-------------|
| `file-upload` | `pnpm add-module file-upload` | S3/local file upload with CQRS |
| `email` | `pnpm add-module email` | Nodemailer email service |
| `redis-cache` | `pnpm add-module redis-cache` | Redis caching layer |
| `notifications` | `pnpm add-module notifications` | In-app notifications CRUD |
| `rate-limit` | `pnpm add-module rate-limit` | Advanced rate limiting |

Each module follows the CQRS pattern:
```
module/
├── commands/
├── queries/
├── dto/
├── module.ts
└── controller.ts
```
