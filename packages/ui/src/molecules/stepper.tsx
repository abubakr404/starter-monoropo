import * as React from "react";
import { cn } from "../lib/utils";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  steps: StepperStep[];
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
}

/**
 * Generic multi-step indicator (Tour Stepper / StepperVertical).
 * Brand-neutral; locale/copy stay with the consumer.
 */
export function Stepper({
  className,
  steps,
  activeStep = 1,
  orientation = "horizontal",
  ...props
}: StepperProps) {
  const vertical = orientation === "vertical";

  return (
    <nav
      aria-label="Progress"
      className={cn(vertical ? "flex flex-col gap-4" : "flex items-start gap-2", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const complete = stepNumber < activeStep;
        const current = stepNumber === activeStep;
        return (
          <div
            key={step.id}
            className={cn(
              "flex gap-3",
              vertical ? "items-start" : "min-w-0 flex-1 flex-col items-center text-center",
            )}
          >
            <div className={cn("flex items-center gap-2", vertical && "pt-0.5")}>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-ui-sm font-medium",
                  complete && "border-primary bg-primary text-primary-foreground",
                  current && "border-primary text-primary",
                  !complete && !current && "border-border text-muted-foreground",
                )}
                aria-current={current ? "step" : undefined}
              >
                {stepNumber}
              </span>
              {vertical ? (
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-ui-sm font-medium",
                      current || complete ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description ? (
                    <p className="text-ui-xs text-muted-foreground">{step.description}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
            {!vertical ? (
              <div className="min-w-0">
                <p
                  className={cn(
                    "truncate text-ui-sm font-medium",
                    current || complete ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </p>
                {step.description ? (
                  <p className="truncate text-ui-xs text-muted-foreground">{step.description}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
