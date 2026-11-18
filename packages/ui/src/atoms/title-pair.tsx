import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const titlePairVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-1",
      default: "gap-1.5",
      lg: "gap-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const titleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-ui-sm",
      default: "text-ui-lg",
      lg: "text-ui-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TitlePairProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titlePairVariants> {
  title: string;
  description?: string;
}

/** Title + supporting line (Tour TitlePair). */
export function TitlePair({ className, size, title, description, ...props }: TitlePairProps) {
  return (
    <div className={cn(titlePairVariants({ size, className }))} {...props}>
      <h3 className={cn(titleVariants({ size }))}>{title}</h3>
      {description ? <p className="text-ui-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
