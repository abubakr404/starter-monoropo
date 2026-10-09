# @starter-monoropo/ui

Atomic design component library (shadcn-style Radix + Tailwind).

```
atoms → molecules → organisms → templates
```

## Theme config (one file)

Edit **`src/theme.css`** to rebrand the whole library:

- colors (primary, success, warning, …)
- border radius
- spacing / padding scale
- control sizes (button & input heights)
- typography scale
- shadows & layout widths

```css
:root {
  --ui-primary: 222.2 47% 11%;   /* change brand color */
  --ui-radius-md: 0.5rem;        /* change corner radius */
  --ui-control-md: 2.5rem;       /* change control height */
  --ui-space-4: 1rem;            /* change spacing unit */
}
```

Import path:

```ts
import "@starter-monoropo/ui/theme.css"; // included via globals.css
```

After editing tokens, restart the Next.js / Tailwind watcher.

## Importing

```tsx
import { Button } from "@starter-monoropo/ui/atoms/button";
import { FormField } from "@starter-monoropo/ui/molecules/form-field";
import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";
```

`apps/web` must keep `transpilePackages: ["@starter-monoropo/ui"]` and Tailwind `@source` pointing at this package.

## Catalog

### Atoms
Button, Input, Textarea, Label, Badge, Avatar, Checkbox, Separator, Spinner, Skeleton, Alert

### Molecules
Card, FormField, Switch, ThemeToggle, Select, Dialog, DropdownMenu, Tabs, Tooltip, Progress, EmptyState, PageHeader, SearchInput

### Organisms
Header, Sidebar, Navbar, Footer, DataTable, Pagination, Breadcrumb, StatCard / StatsGrid, UserMenu

### Templates
AuthLayout, DashboardLayout, MarketingLayout, SettingsLayout, BlankLayout

## Conventions

- Client components that use hooks/Radix: add `"use client"` at the top.
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Prefer theme utilities (`h-control-md`, `rounded-md`, `p-ui-4`, `text-ui-sm`) over hard-coded sizes.
- Do not put app-specific screens in this package — keep those in `apps/web`.
