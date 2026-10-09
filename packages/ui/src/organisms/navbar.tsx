import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Button } from "../atoms/button";

export interface NavbarLink {
  href: string;
  label: string;
}

export interface NavbarProps {
  brand?: ReactNode;
  links?: NavbarLink[];
  actions?: ReactNode;
  className?: string;
}

export function Navbar({
  brand = "Starter",
  links = [],
  actions,
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto flex h-header max-w-container items-center justify-between gap-ui-4 px-ui-4">
        <div className="flex items-center gap-ui-6">
          <Link href="/" className="text-ui-xl font-bold">
            {brand}
          </Link>
          {links.length > 0 && (
            <nav className="hidden items-center gap-ui-4 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ui-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-ui-2">
          {actions ?? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
