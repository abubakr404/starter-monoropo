"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface InputOTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  invalid?: boolean;
  onValueChange?: (value: string) => void;
  autoFocus?: boolean;
}

/**
 * Lightweight OTP input (Tour OTPCell pattern) without an extra package.
 * Uses one hidden field for form submission + visible digit slots.
 */
export function InputOTP({
  className,
  length = 6,
  value: valueProp,
  defaultValue = "",
  disabled = false,
  invalid = false,
  onValueChange,
  autoFocus = false,
  ...props
}: InputOTPProps) {
  const [uncontrolled, setUncontrolled] = React.useState(
    defaultValue.replace(/\D/g, "").slice(0, length),
  );
  const value = (valueProp ?? uncontrolled).replace(/\D/g, "").slice(0, length);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const setValue = (next: string) => {
    const digits = next.replace(/\D/g, "").slice(0, length);
    if (valueProp === undefined) setUncontrolled(digits);
    onValueChange?.(digits);
  };

  return (
    <div
      className={cn("relative inline-flex gap-2", className)}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      <input
        ref={inputRef}
        inputMode="numeric"
        autoComplete="one-time-code"
        disabled={disabled}
        autoFocus={autoFocus}
        value={value}
        aria-invalid={invalid || undefined}
        className="absolute inset-0 opacity-0"
        onChange={(e) => setValue(e.target.value)}
      />
      {Array.from({ length }, (_, i) => {
        const char = value[i] ?? "";
        const focused = value.length === i || (value.length === length && i === length - 1);
        return (
          <div
            key={i}
            aria-hidden
            className={cn(
              "flex h-control-md w-control-md items-center justify-center rounded-md border bg-background text-ui-base font-medium tabular-nums",
              invalid ? "border-destructive" : "border-input",
              focused && !disabled && "ring-2 ring-ring",
              disabled && "opacity-50",
            )}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
}
