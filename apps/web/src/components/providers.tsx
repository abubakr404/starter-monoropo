"use client";

import { Toaster } from "@starter-monoropo/ui/molecules/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
