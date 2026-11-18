import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const overlayVariants = cva("fixed inset-0 z-50", {
  variants: {
    opacity: {
      light: "bg-black/20",
      medium: "bg-black/40",
      heavy: "bg-black/60",
      solid: "bg-black/80",
    },
  },
  defaultVariants: {
    opacity: "medium",
  },
});

export interface OverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof overlayVariants> {}

/** Scrim / backdrop (Tour Overlay) — pair with Dialog/Sheet or custom portals. */
export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, opacity, ...props }, ref) => (
    <div ref={ref} className={cn(overlayVariants({ opacity, className }))} {...props} />
  ),
);
Overlay.displayName = "Overlay";

export { overlayVariants };
