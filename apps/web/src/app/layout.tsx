import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stater/ui/globals.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Stater — Full-stack Starter Template",
  description: "Turborepo + NestJS + Next.js + Prisma + CQRS + shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
