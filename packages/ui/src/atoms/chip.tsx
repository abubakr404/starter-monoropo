import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Soft pill label adapted from Tour Chip — token tones, not Tour brand colors.
 */
const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border text-ui-xs font-medium transition-colors",
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted text-muted-foreground",
        primary: "border-primary/25 bg-primary/10 text-primary",
        secondary: "border-secondary bg-secondary text-secondary-foreground",
        success: "border-success/25 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/15 text-foreground",
        destructive: "border-destructive/25 bg-destructive/10 text-destructive",
        info: "border-info/25 bg-info/10 text-info",
      },
      size: {
        sm: "h-7 px-2.5",
        default: "h-8 px-3.5",
        lg: "h-10 px-4",
      },
      selected: {
        true: "ring-2 ring-ring ring-offset-2 ring-offset-background",
        false: "",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "default",
      selected: false,
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, tone, size, selected, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(chipVariants({ tone, size, selected, className }))}
      {...props}
    />
  ),
);
Chip.displayName = "Chip";

export { chipVariants };
