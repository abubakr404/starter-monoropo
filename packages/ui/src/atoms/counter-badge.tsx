import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const counterBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold tabular-nums text-primary-foreground",
  {
    variants: {
      tone: {
        primary: "bg-primary",
        destructive: "bg-destructive",
        success: "bg-success",
        neutral: "bg-muted-foreground",
      },
      size: {
        sm: "h-4 min-w-4 px-1 text-[10px] leading-none",
        default: "h-5 min-w-5 px-1.5 text-ui-xs leading-none",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "default",
    },
  },
);

export interface CounterBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof counterBadgeVariants> {
  count?: number;
  max?: number;
  showZero?: boolean;
}

export const CounterBadge = React.forwardRef<HTMLSpanElement, CounterBadgeProps>(
  ({ className, tone, size, count = 0, max = 99, showZero = false, ...props }, ref) => {
    if (count <= 0 && !showZero) return null;
    const label = count > max ? `${max}+` : String(count);
    return (
      <span
        ref={ref}
        className={cn(counterBadgeVariants({ tone, size, className }))}
        {...props}
      >
        {label}
      </span>
    );
  },
);
CounterBadge.displayName = "CounterBadge";

export { counterBadgeVariants };
