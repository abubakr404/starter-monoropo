/**
 * Bridge map between CSS tokens (theme.css) and Figma variable names.
 * Source of truth for values remains theme.css — this file documents the pairing
 * used by the Starter Monorepo Design System Figma file.
 *
 * Figma file: https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System
 */

export const FIGMA_FILE_KEY = "yw5Yit1ljqnVWiWWjDAAlJ" as const;
export const FIGMA_FILE_URL =
  "https://www.figma.com/design/yw5Yit1ljqnVWiWWjDAAlJ/Starter-Monorepo-Design-System" as const;

/** Semantic color CSS vars ↔ Figma Color collection variable paths */
export const colorTokenBridge = {
  "--ui-background": "color/background",
  "--ui-foreground": "color/foreground",
  "--ui-card": "color/card",
  "--ui-card-foreground": "color/card-foreground",
  "--ui-primary": "color/primary",
  "--ui-primary-foreground": "color/primary-foreground",
  "--ui-secondary": "color/secondary",
  "--ui-secondary-foreground": "color/secondary-foreground",
  "--ui-muted": "color/muted",
  "--ui-muted-foreground": "color/muted-foreground",
  "--ui-accent": "color/accent",
  "--ui-accent-foreground": "color/accent-foreground",
  "--ui-destructive": "color/destructive",
  "--ui-destructive-foreground": "color/destructive-foreground",
  "--ui-success": "color/success",
  "--ui-success-foreground": "color/success-foreground",
  "--ui-warning": "color/warning",
  "--ui-warning-foreground": "color/warning-foreground",
  "--ui-border": "color/border",
  "--ui-input": "color/input",
  "--ui-ring": "color/ring",
} as const;

export const spacingTokenBridge = {
  "--ui-space-1": "spacing/ui-1",
  "--ui-space-2": "spacing/ui-2",
  "--ui-space-3": "spacing/ui-3",
  "--ui-space-4": "spacing/ui-4",
  "--ui-space-5": "spacing/ui-5",
  "--ui-space-6": "spacing/ui-6",
  "--ui-space-8": "spacing/ui-8",
  "--ui-space-10": "spacing/ui-10",
  "--ui-space-12": "spacing/ui-12",
  "--ui-px-sm": "spacing/px-sm",
  "--ui-px-md": "spacing/px-md",
  "--ui-px-lg": "spacing/px-lg",
} as const;

export const radiusTokenBridge = {
  "--ui-radius-sm": "radius/sm",
  "--ui-radius-md": "radius/md",
  "--ui-radius-lg": "radius/lg",
  "--ui-radius-xl": "radius/xl",
  "--ui-radius-full": "radius/full",
} as const;

export const controlTokenBridge = {
  "--ui-control-sm": "control/sm",
  "--ui-control-md": "control/md",
  "--ui-control-lg": "control/lg",
} as const;

/** Figma component node ids used by Code Connect templates */
export const figmaComponentNodes = {
  Button: "1:210",
  Input: "1:271",
  Label: "1:277",
  Badge: "1:283",
  Card: "1:313",
  Checkbox: "5:15",
  Switch: "5:25",
  Textarea: "5:36",
  Avatar: "5:38",
  Separator: "5:40",
  Skeleton: "5:43",
  Spinner: "5:44",
  Radio: "5:45",
  Slider: "5:49",
  Toggle: "5:53",
  Alert: "5:58",
  Table: "5:71",
  IconButton: "5:86",
} as const;
