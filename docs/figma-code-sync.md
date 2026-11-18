# Figma ↔ Code sync (Starter Monorepo)

Figma file: [Starter Monorepo Design System](https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System)

This documents the **supported** loop between `@starter-monoropo/ui` and Figma. It does **not** claim live pixel-perfect two-way auto-sync of every property — that is not generally available in Cursor + Figma today.

## What syncs (honest matrix)

| Concern | Design → Code | Code → Design | Mechanism |
|--------|---------------|---------------|-----------|
| Semantic colors, spacing, radius, control heights | Manual / agent update of `theme.css` from Figma variables | Manual / agent update of Figma variables from `theme.css` | Shared names via `packages/ui/src/theme/figma-bridge.ts` + Figma variable code syntax `var(--ui-*)` |
| Component API (variants, props) | Dev Mode / Code Connect snippet → implement in TSX | Rebuild / adjust Figma component set with MCP (`use_figma`) | `.figma.ts` templates + optional published Code Connect maps |
| Full screens / layouts | Agent implements from Figma structure | Agent rebuilds with `use_figma` / `generate_figma_design` capture | Not automatic |
| Live property binding both ways | ❌ Not supported as continuous sync | ❌ | — |

## File structure (Figma)

| Page | Purpose |
|------|---------|
| Cover | Entry + intent |
| Foundations / Tokens | Specimen for Color / Spacing |
| Button, Input, Badge, Card, Label | Component sets / mains matching UI package |
| Checkbox, Switch, Textarea, Avatar, Separator, Skeleton, Spinner | Additional atoms |
| RadioGroup, Slider, Toggle, Alert, Table, IconButton | Expanded primitives |
| Selection & progress (Chip, Fab, ToggleGroupItem, Rating, InputOTP, Stepper, QuantityStepper, AvatarGroup, CounterBadge, ButtonGroup) | Tour DS adaptations on starter tokens |
| Example / Auth | Login composition from instances |
| Example / Dashboard | Overview composition from instances |

Molecules such as Dialog, Sheet, Popover, AlertDialog, Select, Tabs, Accordion, Tooltip, DropdownMenu also exist in code; Figma coverage for those overlays is deferred (see report). Tour product cards (Listing/Booking/Wallet/…) stay out of the starter library — adapt per product.

## Source of truth

- **Token values:** `packages/ui/src/theme.css` (code) — keep Figma Color/Spacing/Radius/Control collections aligned.
- **Component behavior:** React components under `packages/ui/src/atoms|molecules`.
- **Figma visuals / variants:** Figma library file above — publish as a team library when ready for reuse across files.

## Code Connect

Templates live in `packages/ui/src/figma/*.figma.ts` (parserless `figma.code` format). Config: `figma.config.json`.

### Remaining user steps

1. In Figma (normall team): **Publish** the design system library (Assets → publish) so Code Connect / library consumers can resolve components.
2. Accept / confirm Code Connect mappings in Figma Dev Mode if prompted.
3. Optional: install `@figma/code-connect` and run publish from CI when on a plan that supports CLI publish (Organization/Enterprise features vary; Pro + Code Layers helps agent/Dev Mode paths).

## Workflow recipes (Figma MCP)

### Design → code

1. `create_session` with the file key.
2. Inspect nodes with `use_figma` / `get_metadata` (do not rely on `get_design_context` in agent environments without selection).
3. Read Code Connect templates or `get_code_connect_suggestions` after publish.
4. Change `theme.css` and/or React components; keep `figma-bridge.ts` names in sync.

### Code → design

1. Diff `theme.css` / component props against Figma variables / variant axes.
2. `search_design_system` + `get_libraries` before inventing new assets.
3. Update variables / components with `use_figma` (load `figma-use` + `figma-generate-library` / `figma-generate-design` skills).
4. For web screens, optionally run `generate_figma_design` capture in parallel as a visual reference, then refine editable layers.

## Code Layers

This account reports `code_layers_enabled: true` on the normall plan. Prefer Code Layers / Code Connect for component linkage when the UI prompts for them. Still not continuous auto-sync of arbitrary CSS.

## Related files

- `packages/ui/src/theme/figma-bridge.ts` — CSS ↔ Figma name map + node ids
- `packages/ui/src/theme/tokens.ts` — typed token group names
- `packages/ui/src/figma/*.figma.ts` — Code Connect templates
