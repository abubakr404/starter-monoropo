import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "../lib/utils";

/**
 * Convenience wrapper for icon-only buttons (shadcn pattern: Button size="icon").
 */
export const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, "size">>(
  ({ className, children, ...props }, ref) => (
    <Button ref={ref} size="icon" className={cn(className)} {...props}>
      {children}
    </Button>
  ),
);
IconButton.displayName = "IconButton";
