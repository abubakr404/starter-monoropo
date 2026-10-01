import * as React from "react";
import { Label } from "../atoms/label";
import { Input, type InputProps } from "../atoms/input";
import { cn } from "../lib/utils";

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
  description?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, description, id, className, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={fieldId}>{label}</Label>
        <Input id={fieldId} ref={ref} aria-invalid={!!error} {...props} />
        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);
FormField.displayName = "FormField";
