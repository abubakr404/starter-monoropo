import * as React from "react";
import { cn } from "../lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-ui-xs font-semibold transition-colors",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
          "border-transparent bg-success text-success-foreground": variant === "success",
          "border-transparent bg-warning text-warning-foreground": variant === "warning",
          "text-foreground": variant === "outline",
        },
        className,
      )}
      {...props}
    />
  );
}
