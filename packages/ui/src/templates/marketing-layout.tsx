import type { ReactNode } from "react";
import { Navbar, type NavbarLink } from "../organisms/navbar";
import { Footer, type FooterLink } from "../organisms/footer";

export interface MarketingLayoutProps {
  children: ReactNode;
  brand?: string;
  navLinks?: NavbarLink[];
  footerLinks?: FooterLink[];
  navActions?: ReactNode;
}

export function MarketingLayout({
  children,
  brand = "Starter",
  navLinks,
  footerLinks,
  navActions,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar brand={brand} links={navLinks} actions={navActions} />
      <main className="flex-1">{children}</main>
      <Footer brand={brand} links={footerLinks} />
    </div>
  );
}
