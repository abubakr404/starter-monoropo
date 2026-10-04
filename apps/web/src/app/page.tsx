"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@starter-monoropo/ui/atoms/button";
import { Input } from "@starter-monoropo/ui/atoms/input";
import { Label } from "@starter-monoropo/ui/atoms/label";
import { Badge } from "@starter-monoropo/ui/atoms/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@starter-monoropo/ui/atoms/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@starter-monoropo/ui/molecules/card";
import { FormField } from "@starter-monoropo/ui/molecules/form-field";
import { Switch } from "@starter-monoropo/ui/molecules/switch";
import { ThemeToggle } from "@starter-monoropo/ui/molecules/theme-toggle";
import { Header } from "@starter-monoropo/ui/organisms/header";
import { Sidebar } from "@starter-monoropo/ui/organisms/sidebar";
import { DataTable } from "@starter-monoropo/ui/organisms/data-table";
import { AuthLayout } from "@starter-monoropo/ui/templates/auth-layout";
import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";

const tocItems = [
  { id: "atoms", label: "Atoms" },
  { id: "molecules", label: "Molecules" },
  { id: "organisms", label: "Organisms" },
  { id: "templates", label: "Templates" },
] as const;

const sampleUsers = [
  { id: "1", name: "Alice Chen", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Rivera", email: "bob@example.com", role: "Editor" },
  { id: "3", name: "Carol Diaz", email: "carol@example.com", role: "Viewer" },
];

function ImportPath({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-md border bg-muted/50 p-3 text-xs">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function DemoBlock({
  name,
  importPath,
  children,
}: {
  name: string;
  importPath: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <ImportPath>{importPath}</ImportPath>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">{children}</CardContent>
    </Card>
  );
}

export default function DesignSystemPage() {
  const [formEmail, setFormEmail] = useState("");
  const [formError, setFormError] = useState<string | undefined>();
  const [switchOn, setSwitchOn] = useState(false);

  const validateEmail = (value: string) => {
    setFormEmail(value);
    if (!value) {
      setFormError(undefined);
      return;
    }
    setFormError(value.includes("@") ? undefined : "Enter a valid email address");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b bg-muted/30">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Design system</h1>
            <Badge variant="secondary">@starter-monoropo/ui</Badge>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>

      <div className="container mx-auto flex gap-10 px-4 py-10">
        <aside className="hidden w-44 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1 text-sm">
            <p className="mb-2 font-semibold text-muted-foreground">On this page</p>
            {tocItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 space-y-16 pb-20">
          <Section
            id="atoms"
            title="Atoms"
            description="Primitive building blocks — buttons, inputs, labels, badges, and avatars."
          >
            <DemoBlock
              name="Button"
              importPath={`import { Button } from "@starter-monoropo/ui/atoms/button";`}
            >
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Add">
                +
              </Button>
              <Button disabled>Disabled</Button>
            </DemoBlock>

            <DemoBlock
              name="Input"
              importPath={`import { Input } from "@starter-monoropo/ui/atoms/input";`}
            >
              <Input className="max-w-xs" placeholder="Placeholder text" />
              <Input className="max-w-xs" type="email" placeholder="email@example.com" />
              <Input className="max-w-xs" disabled placeholder="Disabled" />
            </DemoBlock>

            <DemoBlock
              name="Label"
              importPath={`import { Label } from "@starter-monoropo/ui/atoms/label";`}
            >
              <div className="flex w-full max-w-xs flex-col gap-2">
                <Label htmlFor="catalog-label-demo">Username</Label>
                <Input id="catalog-label-demo" placeholder="jane.doe" />
              </div>
            </DemoBlock>

            <DemoBlock
              name="Badge"
              importPath={`import { Badge } from "@starter-monoropo/ui/atoms/badge";`}
            >
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </DemoBlock>

            <DemoBlock
              name="Avatar"
              importPath={`import { Avatar, AvatarImage, AvatarFallback } from "@starter-monoropo/ui/atoms/avatar";`}
            >
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="Alice" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-sm">CD</AvatarFallback>
              </Avatar>
            </DemoBlock>
          </Section>

          <Section
            id="molecules"
            title="Molecules"
            description="Composed UI patterns built from atoms."
          >
            <DemoBlock
              name="Card"
              importPath={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@starter-monoropo/ui/molecules/card";`}
            >
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>Supporting description for the card content.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Card body with any children.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </DemoBlock>

            <DemoBlock
              name="FormField"
              importPath={`import { FormField } from "@starter-monoropo/ui/molecules/form-field";`}
            >
              <div className="w-full max-w-sm space-y-2">
                <FormField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  description="We will never share your email."
                  value={formEmail}
                  onChange={(e) => validateEmail(e.target.value)}
                  error={formError}
                />
                <p className="text-xs text-muted-foreground">
                  Live value: {formEmail || "(empty)"}
                </p>
              </div>
            </DemoBlock>

            <DemoBlock
              name="Switch"
              importPath={`import { Switch } from "@starter-monoropo/ui/molecules/switch";`}
            >
              <div className="flex items-center gap-3">
                <Switch
                  id="catalog-switch"
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
                <Label htmlFor="catalog-switch">
                  Notifications {switchOn ? "on" : "off"}
                </Label>
              </div>
            </DemoBlock>

            <DemoBlock
              name="ThemeToggle"
              importPath={`import { ThemeToggle } from "@starter-monoropo/ui/molecules/theme-toggle";`}
            >
              <ThemeToggle />
            </DemoBlock>
          </Section>

          <Section
            id="organisms"
            title="Organisms"
            description="Larger sections: navigation chrome and data display."
          >
            <DemoBlock
              name="Header"
              importPath={`import { Header } from "@starter-monoropo/ui/organisms/header";`}
            >
              <div className="w-full overflow-hidden rounded-md border">
                <Header user={{ name: "Demo User", email: "demo@example.com" }} />
              </div>
            </DemoBlock>

            <DemoBlock
              name="Sidebar"
              importPath={`import { Sidebar } from "@starter-monoropo/ui/organisms/sidebar";`}
            >
              <div className="h-64 w-full max-w-xs overflow-hidden rounded-md border">
                <Sidebar />
              </div>
            </DemoBlock>

            <DemoBlock
              name="DataTable"
              importPath={`import { DataTable } from "@starter-monoropo/ui/organisms/data-table";`}
            >
              <div className="w-full">
                <DataTable
                  columns={[
                    { key: "name", header: "Name" },
                    { key: "email", header: "Email" },
                    { key: "role", header: "Role" },
                  ]}
                  data={sampleUsers}
                />
              </div>
            </DemoBlock>
          </Section>

          <Section
            id="templates"
            title="Templates"
            description="Full-page layouts for auth and dashboard experiences."
          >
            <DemoBlock
              name="AuthLayout"
              importPath={`import { AuthLayout } from "@starter-monoropo/ui/templates/auth-layout";`}
            >
              <div className="h-[320px] w-full overflow-hidden rounded-md border bg-background">
                <div className="origin-top scale-[0.55]">
                  <AuthLayout title="Sign in" description="Scaled preview of the auth shell.">
                    <Card>
                      <CardContent className="space-y-3 pt-6">
                        <FormField label="Email" type="email" placeholder="you@example.com" />
                        <Button className="w-full">Continue</Button>
                      </CardContent>
                    </Card>
                  </AuthLayout>
                </div>
              </div>
            </DemoBlock>

            <DemoBlock
              name="DashboardLayout"
              importPath={`import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";`}
            >
              <div className="h-[360px] w-full overflow-hidden rounded-md border bg-background">
                <div className="origin-top scale-[0.5]">
                  <DashboardLayout user={{ name: "Demo User", email: "demo@example.com" }}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Dashboard content</CardTitle>
                        <CardDescription>Scaled preview with header and sidebar.</CardDescription>
                      </CardHeader>
                    </Card>
                  </DashboardLayout>
                </div>
              </div>
            </DemoBlock>
          </Section>
        </main>
      </div>
    </div>
  );
}
