import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@starter-monoropo/ui/globals.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Starter — Design System",
  description: "Atomic design component catalog for @starter-monoropo/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
