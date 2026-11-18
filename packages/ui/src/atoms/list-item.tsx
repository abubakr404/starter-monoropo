import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const listItemVariants = cva(
  "flex w-full items-center gap-ui-3 rounded-md border border-border bg-background px-ui-3 py-ui-3 text-left transition-colors",
  {
    variants: {
      selected: {
        true: "bg-accent",
        false: "hover:bg-muted/50",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  },
);

export interface ListItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof listItemVariants>, "disabled"> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title: string;
  description?: string;
}

/**
 * Generic selectable row (Tour ListItem) — compose with Checkbox/Radio as leading/trailing.
 */
export const ListItem = React.forwardRef<HTMLButtonElement, ListItemProps>(
  (
    { className, selected, disabled, leading, trailing, title, description, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled ?? false}
      className={cn(listItemVariants({ selected, disabled, className }))}
      {...props}
    >
      {leading ? <span className="shrink-0">{leading}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-ui-sm font-medium text-foreground">{title}</span>
        {description ? (
          <span className="block truncate text-ui-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
      {trailing ? <span className="shrink-0">{trailing}</span> : null}
    </button>
  ),
);
ListItem.displayName = "ListItem";

export { listItemVariants };
