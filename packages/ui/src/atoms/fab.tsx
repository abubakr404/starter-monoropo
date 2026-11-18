import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Floating action button — Tour FAB adapted to starter tokens / CVA.
 * Positioning is left to the consumer (e.g. fixed bottom-end).
 */
const fabVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium shadow-ui-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        soft: "bg-primary/15 text-primary hover:bg-primary/25",
        outline: "border border-input bg-background text-foreground hover:bg-accent",
      },
      size: {
        sm: "h-10 min-w-10 rounded-full px-3 text-ui-sm",
        default: "h-12 min-w-12 rounded-full px-4 text-ui-sm",
        lg: "h-14 min-w-14 rounded-full px-5 text-ui-base",
      },
      extended: {
        true: "rounded-full",
        false: "aspect-square px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      extended: false,
    },
  },
);

export interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  asChild?: boolean;
}

export const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, extended, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(fabVariants({ variant, size, extended, className }))}
        {...props}
      />
    );
  },
);
Fab.displayName = "Fab";

export { fabVariants };
