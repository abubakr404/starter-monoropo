import Link from "next/link";
import { cn } from "../lib/utils";
import { Separator } from "../atoms/separator";

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterProps {
  brand?: string;
  description?: string;
  links?: FooterLink[];
  className?: string;
}

export function Footer({
  brand = "Starter",
  description = "Full-stack starter template for shipping products faster.",
  links = [
    { href: "/docs", label: "Docs" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="mx-auto max-w-container px-ui-4 py-ui-10">
        <div className="grid gap-ui-8 md:grid-cols-2">
          <div>
            <p className="text-ui-lg font-semibold">{brand}</p>
            <p className="mt-ui-2 max-w-md text-ui-sm text-muted-foreground">{description}</p>
          </div>
          <nav className="flex flex-wrap gap-ui-4 md:justify-end">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ui-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-ui-6" />
        <p className="text-ui-xs text-muted-foreground">
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
