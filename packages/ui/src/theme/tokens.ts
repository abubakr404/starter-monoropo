/**
 * Typed mirror of theme.css tokens for docs / runtime reads.
 * Source of truth for values remains theme.css — keep names in sync.
 */
export const themeTokenGroups = {
  colors: [
    "background",
    "foreground",
    "primary",
    "secondary",
    "muted",
    "accent",
    "destructive",
    "success",
    "warning",
    "border",
    "card",
  ],
  radii: ["sm", "md", "lg", "xl", "full"],
  spacing: ["ui-1", "ui-2", "ui-3", "ui-4", "ui-5", "ui-6", "ui-8"],
  controlHeights: ["control-sm", "control-md", "control-lg"],
} as const;

export type ThemeColor = (typeof themeTokenGroups.colors)[number];
