import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export interface BlankLayoutProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function BlankLayout({ children, className, centered }: BlankLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        centered && "flex items-center justify-center p-ui-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
