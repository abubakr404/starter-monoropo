import Link from "next/link";
import { Button } from "@stater/ui/atoms/button";
import { Header } from "@stater/ui/organisms/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stater/ui/molecules/card";

const features = [
  {
    title: "Turborepo Monorepo",
    description: "Shared packages, fast builds, and scalable project structure.",
  },
  {
    title: "NestJS + CQRS",
    description: "Backend with command/query separation, JWT auth, and Swagger docs.",
  },
  {
    title: "Next.js + shadcn/ui",
    description: "Modern frontend with atomic design, Tailwind CSS, and dark mode.",
  },
  {
    title: "Prisma + PostgreSQL",
    description: "Type-safe database access with migrations and studio.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Ship faster with{" "}
            <span className="text-primary">Stater</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A production-ready full-stack starter template. Turborepo, NestJS, Next.js,
            Prisma, CQRS, and shadcn/ui — with optional modules you can add on demand.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
