import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Visually groups sibling buttons (Tour ButtonGroup pattern).
 */
export function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex overflow-hidden rounded-md border border-input [&>button]:rounded-none [&>button]:border-0 [&>button]:shadow-none",
        orientation === "horizontal"
          ? "flex-row [&>button:not(:last-child)]:border-r [&>button:not(:last-child)]:border-input"
          : "flex-col [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-input",
        className,
      )}
      {...props}
    />
  );
}
