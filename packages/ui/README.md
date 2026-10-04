# @starter-monoropo/ui

Atomic design component library (shadcn-style Radix + Tailwind).

```
atoms → molecules → organisms → templates
```

## Importing

```tsx
import { Button } from "@starter-monoropo/ui/atoms/button";
import { FormField } from "@starter-monoropo/ui/molecules/form-field";
import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";
```

`apps/web` must keep `transpilePackages: ["@starter-monoropo/ui"]` and Tailwind `@source` pointing at this package.

## Adding components (shadcn CLI)

Components live in this package, not in `apps/web`.

1. From the monorepo root (or `packages/ui`), init once if needed:

```bash
cd packages/ui
npx shadcn@latest init
```

When prompted, point:

| Setting | Value |
|---------|--------|
| Style | Default / New York (match existing) |
| Tailwind CSS | `src/globals.css` |
| Components alias | `@starter-monoropo/ui` / relative `./src` |
| Utils | `src/lib/utils.ts` (`cn`) |

2. Add a component into the right atomic layer:

```bash
# Example: dialog → molecules (or organisms if composed)
npx shadcn@latest add dialog
```

3. Move/rename the generated file into `src/atoms|molecules|organisms/` and re-export via the existing `package.json` `exports` map if you introduce a new folder path.

4. Prefer extending what is already here (`button`, `input`, `card`, `form-field`, `data-table`, …) before adding duplicates.

## Conventions

- Client components that use hooks/Radix: add `"use client"` at the top.
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Do not put app-specific screens in this package — keep those in `apps/web`.
