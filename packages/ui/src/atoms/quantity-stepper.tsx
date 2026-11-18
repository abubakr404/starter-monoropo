"use client";

import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { cn } from "../lib/utils";

export interface QuantityStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
}

export function QuantityStepper({
  className,
  value: valueProp,
  defaultValue = 0,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  disabled = false,
  onValueChange,
  ...props
}: QuantityStepperProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const value = valueProp ?? uncontrolled;

  const setValue = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (valueProp === undefined) setUncontrolled(clamped);
    onValueChange?.(clamped);
  };

  return (
    <div
      className={cn(
        "inline-flex h-control-md items-center overflow-hidden rounded-md border border-input bg-background",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full w-control-md rounded-none"
        disabled={disabled || value <= min}
        aria-label="Decrease"
        onClick={() => setValue(value - step)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span
        className="min-w-10 flex-1 px-2 text-center text-ui-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full w-control-md rounded-none"
        disabled={disabled || value >= max}
        aria-label="Increase"
        onClick={() => setValue(value + step)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
