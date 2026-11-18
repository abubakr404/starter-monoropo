"use client";

import { Star } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  readOnly?: boolean;
  onValueChange?: (value: number) => void;
  size?: "sm" | "default" | "lg";
}

const sizeClass = {
  sm: "h-3.5 w-3.5",
  default: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

export function Rating({
  className,
  value = 0,
  max = 5,
  readOnly = false,
  onValueChange,
  size = "default",
  ...props
}: RatingProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div
      role={readOnly ? "img" : "radiogroup"}
      aria-label={readOnly ? `${value} of ${max} stars` : "Rating"}
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHover(null)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= display;
        return (
          <button
            key={starValue}
            type="button"
            role={readOnly ? undefined : "radio"}
            aria-checked={readOnly ? undefined : value === starValue}
            aria-label={`${starValue} star`}
            disabled={readOnly}
            className={cn(
              "rounded-sm text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              filled && "text-warning",
              readOnly ? "cursor-default" : "cursor-pointer hover:text-warning",
            )}
            onMouseEnter={() => {
              if (!readOnly) setHover(starValue);
            }}
            onClick={() => onValueChange?.(starValue)}
          >
            <Star
              className={cn(sizeClass[size], filled && "fill-current")}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
