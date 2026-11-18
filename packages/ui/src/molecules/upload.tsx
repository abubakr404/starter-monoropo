"use client";

import { Upload as UploadIcon, X } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "../atoms/button";

export interface UploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  value?: File[];
  onValueChange?: (files: File[]) => void;
  hint?: string;
  label?: string;
}

/**
 * Dropzone / file picker (Tour Upload) — brand-neutral, token surfaces.
 */
export function Upload({
  className,
  accept,
  multiple = false,
  disabled = false,
  invalid = false,
  value,
  onValueChange,
  hint = "Drag and drop, or click to browse",
  label = "Upload",
  ...props
}: UploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [uncontrolled, setUncontrolled] = React.useState<File[]>([]);
  const files = value ?? uncontrolled;

  const setFiles = (next: File[]) => {
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const mergeFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const list = Array.from(incoming);
    setFiles(multiple ? [...files, ...list] : list.slice(0, 1));
  };

  return (
    <div className={cn("space-y-ui-2", className)} {...props}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex flex-col items-center justify-center gap-ui-2 rounded-lg border border-dashed bg-background px-ui-6 py-ui-8 text-center transition-colors",
          dragging && "border-primary bg-primary/5",
          invalid && "border-destructive",
          disabled ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted/40",
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) mergeFiles(e.dataTransfer.files);
        }}
      >
        <UploadIcon className="h-6 w-6 text-muted-foreground" aria-hidden />
        <div>
          <p className="text-ui-sm font-medium">{label}</p>
          <p className="text-ui-xs text-muted-foreground">{hint}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => mergeFiles(e.target.files)}
        />
      </div>
      {files.length > 0 ? (
        <ul className="space-y-ui-1">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-ui-2 rounded-md border border-border px-ui-3 py-ui-2 text-ui-sm"
            >
              <span className="truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                aria-label={`Remove ${file.name}`}
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
