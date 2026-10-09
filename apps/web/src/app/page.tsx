"use client";

import * as React from "react";
import Link from "next/link";
import { themeTokenGroups } from "@starter-monoropo/ui/theme/tokens";
import { Alert, AlertDescription, AlertTitle } from "@starter-monoropo/ui/atoms/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@starter-monoropo/ui/atoms/avatar";
import { Badge } from "@starter-monoropo/ui/atoms/badge";
import { Button } from "@starter-monoropo/ui/atoms/button";
import { Checkbox } from "@starter-monoropo/ui/atoms/checkbox";
import { Input } from "@starter-monoropo/ui/atoms/input";
import { Label } from "@starter-monoropo/ui/atoms/label";
import { Separator } from "@starter-monoropo/ui/atoms/separator";
import { Skeleton } from "@starter-monoropo/ui/atoms/skeleton";
import { Spinner } from "@starter-monoropo/ui/atoms/spinner";
import { Textarea } from "@starter-monoropo/ui/atoms/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@starter-monoropo/ui/molecules/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@starter-monoropo/ui/molecules/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@starter-monoropo/ui/molecules/dropdown-menu";
import { EmptyState } from "@starter-monoropo/ui/molecules/empty-state";
import { FormField } from "@starter-monoropo/ui/molecules/form-field";
import { PageHeader } from "@starter-monoropo/ui/molecules/page-header";
import { Progress } from "@starter-monoropo/ui/molecules/progress";
import { SearchInput } from "@starter-monoropo/ui/molecules/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@starter-monoropo/ui/molecules/select";
import { Switch } from "@starter-monoropo/ui/molecules/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@starter-monoropo/ui/molecules/tabs";
import { ThemeToggle } from "@starter-monoropo/ui/molecules/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@starter-monoropo/ui/molecules/tooltip";
import { Breadcrumb } from "@starter-monoropo/ui/organisms/breadcrumb";
import { DataTable } from "@starter-monoropo/ui/organisms/data-table";
import { Footer } from "@starter-monoropo/ui/organisms/footer";
import { Header } from "@starter-monoropo/ui/organisms/header";
import { Navbar } from "@starter-monoropo/ui/organisms/navbar";
import { Pagination } from "@starter-monoropo/ui/organisms/pagination";
import { Sidebar } from "@starter-monoropo/ui/organisms/sidebar";
import { StatCard, StatsGrid } from "@starter-monoropo/ui/organisms/stats";
import { UserMenu } from "@starter-monoropo/ui/organisms/user-menu";
import { AuthLayout } from "@starter-monoropo/ui/templates/auth-layout";
import { BlankLayout } from "@starter-monoropo/ui/templates/blank-layout";
import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";
import { MarketingLayout } from "@starter-monoropo/ui/templates/marketing-layout";
import { SettingsLayout } from "@starter-monoropo/ui/templates/settings-layout";

const tocItems = [
  { id: "theme-tokens", label: "Theme tokens" },
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

const radiusBoxClass: Record<(typeof themeTokenGroups.radii)[number], string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const spacingBarClass: Record<(typeof themeTokenGroups.spacing)[number], string> = {
  "ui-1": "w-ui-1",
  "ui-2": "w-ui-2",
  "ui-3": "w-ui-3",
  "ui-4": "w-ui-4",
  "ui-5": "w-ui-5",
  "ui-6": "w-ui-6",
  "ui-8": "w-ui-8",
};

const controlHeightClass: Record<(typeof themeTokenGroups.controlHeights)[number], string> = {
  "control-sm": "h-control-sm",
  "control-md": "h-control-md",
  "control-lg": "h-control-lg",
};

const colorSwatchClass: Record<(typeof themeTokenGroups.colors)[number], string> = {
  background: "bg-background border border-border",
  foreground: "bg-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  muted: "bg-muted",
  accent: "bg-accent",
  destructive: "bg-destructive",
  success: "bg-success",
  warning: "bg-warning",
  border: "bg-background border-4 border-border",
  card: "bg-card border border-border",
};

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
  contentClassName,
}: {
  name: string;
  importPath: string;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <ImportPath>{importPath}</ImportPath>
      </CardHeader>
      <CardContent className={contentClassName ?? "flex flex-wrap items-center gap-3"}>
        {children}
      </CardContent>
    </Card>
  );
}

function PreviewFrame({
  minHeight,
  scale,
  children,
}: {
  minHeight: string;
  scale: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-md border bg-background"
      style={{ minHeight }}
    >
      <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}>
        {children}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [formEmail, setFormEmail] = React.useState("");
  const [formError, setFormError] = React.useState<string | undefined>();
  const [switchOn, setSwitchOn] = React.useState(false);
  const [checkboxOn, setCheckboxOn] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("starter");
  const [paginationPage, setPaginationPage] = React.useState(2);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [emptyActionCount, setEmptyActionCount] = React.useState(0);

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
            id="theme-tokens"
            title="Theme tokens"
            description="Semantic colors, radius, spacing, and control sizes. Edit packages/ui/src/theme.css to rebrand the entire library."
          >
            <DemoBlock
              name="Color tokens"
              importPath={`import { themeTokenGroups } from "@starter-monoropo/ui/theme/tokens";\n// Values: packages/ui/src/theme.css`}
              contentClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {themeTokenGroups.colors.map((token) => (
                <div key={token} className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 shrink-0 rounded-md shadow-ui-sm ${colorSwatchClass[token]}`}
                    aria-hidden
                  />
                  <div>
                    <p className="font-mono text-sm font-medium">{token}</p>
                    <p className="text-xs text-muted-foreground">
                      bg-{token === "border" ? "background + border" : token}
                    </p>
                  </div>
                </div>
              ))}
            </DemoBlock>

            <DemoBlock
              name="Border radius"
              importPath={`/* theme.css → --ui-radius-* mapped to rounded-sm … rounded-full */`}
              contentClassName="flex flex-wrap gap-6"
            >
              {themeTokenGroups.radii.map((radius) => (
                <div key={radius} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-16 w-16 border-2 border-primary bg-primary/10 ${radiusBoxClass[radius]}`}
                  />
                  <span className="font-mono text-xs text-muted-foreground">rounded-{radius}</span>
                </div>
              ))}
            </DemoBlock>

            <DemoBlock
              name="Spacing scale"
              importPath={`/* Tailwind: w-ui-1 … w-ui-8 from --ui-space-* */`}
              contentClassName="space-y-3"
            >
              {themeTokenGroups.spacing.map((space) => (
                <div key={space} className="flex items-center gap-4">
                  <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
                    {space}
                  </span>
                  <div className={`h-4 rounded-sm bg-primary ${spacingBarClass[space]}`} />
                </div>
              ))}
            </DemoBlock>

            <DemoBlock
              name="Control heights"
              importPath={`/* h-control-sm | h-control-md | h-control-lg */`}
              contentClassName="space-y-3"
            >
              {themeTokenGroups.controlHeights.map((height) => (
                <div key={height} className="flex items-center gap-4">
                  <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
                    h-{height}
                  </span>
                  <div
                    className={`w-full max-w-md rounded-md border border-dashed border-primary/40 bg-muted/50 ${controlHeightClass[height]}`}
                  />
                </div>
              ))}
            </DemoBlock>
          </Section>

          <Section
            id="atoms"
            title="Atoms"
            description="Primitive building blocks — buttons, inputs, feedback, and layout primitives."
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
              <Button variant="success">Success</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default size</Button>
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
              name="Textarea"
              importPath={`import { Textarea } from "@starter-monoropo/ui/atoms/textarea";`}
            >
              <Textarea className="max-w-md" placeholder="Write a longer message…" rows={3} />
            </DemoBlock>

            <DemoBlock
              name="Label"
              importPath={`import { Label } from "@starter-monoropo/ui/atoms/label";`}
            >
              <div className="flex w-full max-w-xs flex-col gap-2">
                <Label htmlFor="ds-label-demo">Username</Label>
                <Input id="ds-label-demo" placeholder="jane.doe" />
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
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </DemoBlock>

            <DemoBlock
              name="Avatar"
              importPath={`import { Avatar, AvatarImage, AvatarFallback } from "@starter-monoropo/ui/atoms/avatar";`}
            >
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
                  alt="Alice"
                />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-sm">CD</AvatarFallback>
              </Avatar>
            </DemoBlock>

            <DemoBlock
              name="Checkbox"
              importPath={`import { Checkbox } from "@starter-monoropo/ui/atoms/checkbox";`}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id="ds-checkbox"
                  checked={checkboxOn}
                  onCheckedChange={(v) => setCheckboxOn(v === true)}
                />
                <Label htmlFor="ds-checkbox">
                  Accept terms {checkboxOn ? "(checked)" : "(unchecked)"}
                </Label>
              </div>
            </DemoBlock>

            <DemoBlock
              name="Separator"
              importPath={`import { Separator } from "@starter-monoropo/ui/atoms/separator";`}
              contentClassName="w-full max-w-md space-y-4"
            >
              <p className="text-sm text-muted-foreground">Content above</p>
              <Separator />
              <p className="text-sm text-muted-foreground">Content below</p>
            </DemoBlock>

            <DemoBlock
              name="Spinner"
              importPath={`import { Spinner } from "@starter-monoropo/ui/atoms/spinner";`}
            >
              <Spinner />
              <Spinner className="h-8 w-8" />
            </DemoBlock>

            <DemoBlock
              name="Skeleton"
              importPath={`import { Skeleton } from "@starter-monoropo/ui/atoms/skeleton";`}
              contentClassName="w-full max-w-sm space-y-3"
            >
              <Skeleton className="h-4 w-[75%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-24 w-full rounded-md" />
            </DemoBlock>

            <DemoBlock
              name="Alert"
              importPath={`import { Alert, AlertTitle, AlertDescription } from "@starter-monoropo/ui/atoms/alert";`}
              contentClassName="grid w-full gap-4"
            >
              <Alert>
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>Default alert with title and description.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Try again.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes were saved.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Review settings before continuing.</AlertDescription>
              </Alert>
            </DemoBlock>
          </Section>

          <Section
            id="molecules"
            title="Molecules"
            description="Composed patterns built from atoms — forms, overlays, and page chrome."
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
                  onChange={(e) => validateEmail(e.currentTarget.value)}
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
                <Switch id="ds-switch" checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label htmlFor="ds-switch">
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

            <DemoBlock
              name="Select"
              importPath={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@starter-monoropo/ui/molecules/select";`}
            >
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Pick a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">Selected: {selectValue}</span>
            </DemoBlock>

            <DemoBlock
              name="Dialog"
              importPath={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@starter-monoropo/ui/molecules/dialog";`}
            >
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogDescription>
                      This dialog is controlled with React.useState for the open flag.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>Continue</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <span className="text-sm text-muted-foreground">
                Open: {dialogOpen ? "yes" : "no"}
              </span>
            </DemoBlock>

            <DemoBlock
              name="DropdownMenu"
              importPath={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@starter-monoropo/ui/molecules/dropdown-menu";`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DemoBlock>

            <DemoBlock
              name="Tabs"
              importPath={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@starter-monoropo/ui/molecules/tabs";`}
              contentClassName="w-full max-w-md"
            >
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="rounded-md border p-4 text-sm">
                  Account settings and profile details.
                </TabsContent>
                <TabsContent value="security" className="rounded-md border p-4 text-sm">
                  Password, 2FA, and active sessions.
                </TabsContent>
                <TabsContent value="billing" className="rounded-md border p-4 text-sm">
                  Plans, invoices, and payment methods.
                </TabsContent>
              </Tabs>
            </DemoBlock>

            <DemoBlock
              name="Tooltip"
              importPath={`import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@starter-monoropo/ui/molecules/tooltip";`}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      Hover me
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tooltip content from the design system</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DemoBlock>

            <DemoBlock
              name="Progress"
              importPath={`import { Progress } from "@starter-monoropo/ui/molecules/progress";`}
              contentClassName="w-full max-w-md space-y-2"
            >
              <Progress value={33} />
              <Progress value={66} />
              <Progress value={100} />
            </DemoBlock>

            <DemoBlock
              name="EmptyState"
              importPath={`import { EmptyState } from "@starter-monoropo/ui/molecules/empty-state";`}
              contentClassName="w-full"
            >
              <EmptyState
                title="No projects yet"
                description="Create your first project to see it listed here."
                actionLabel="Create project"
                onAction={() => setEmptyActionCount((c) => c + 1)}
              />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Action clicks: {emptyActionCount}
              </p>
            </DemoBlock>

            <DemoBlock
              name="PageHeader"
              importPath={`import { PageHeader } from "@starter-monoropo/ui/molecules/page-header";`}
              contentClassName="w-full"
            >
              <PageHeader
                title="Users"
                description="Manage team members and roles."
                actions={
                  <>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                    <Button size="sm">Invite</Button>
                  </>
                }
              />
            </DemoBlock>

            <DemoBlock
              name="SearchInput"
              importPath={`import { SearchInput } from "@starter-monoropo/ui/molecules/search-input";`}
            >
              <div className="w-full max-w-sm space-y-2">
                <SearchInput
                  placeholder="Search users…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Query: {searchQuery || "(empty)"}
                </p>
              </div>
            </DemoBlock>
          </Section>

          <Section
            id="organisms"
            title="Organisms"
            description="Navigation, data display, and account patterns at page scale."
          >
            <DemoBlock
              name="Header"
              importPath={`import { Header } from "@starter-monoropo/ui/organisms/header";`}
              contentClassName="w-full"
            >
              <div className="w-full overflow-hidden rounded-md border">
                <Header user={{ name: "Demo User", email: "demo@example.com" }} />
              </div>
            </DemoBlock>

            <DemoBlock
              name="Navbar"
              importPath={`import { Navbar } from "@starter-monoropo/ui/organisms/navbar";`}
              contentClassName="w-full"
            >
              <div className="w-full overflow-hidden rounded-md border">
                <Navbar
                  brand="Starter"
                  links={[
                    { href: "#atoms", label: "Components" },
                    { href: "#templates", label: "Templates" },
                  ]}
                  actions={
                    <>
                      <ThemeToggle />
                      <Button size="sm">CTA</Button>
                    </>
                  }
                />
              </div>
            </DemoBlock>

            <DemoBlock
              name="Footer"
              importPath={`import { Footer } from "@starter-monoropo/ui/organisms/footer";`}
              contentClassName="w-full"
            >
              <div className="w-full overflow-hidden rounded-md border">
                <Footer brand="Starter" />
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
              contentClassName="w-full"
            >
              <DataTable
                columns={[
                  { key: "name", header: "Name" },
                  { key: "email", header: "Email" },
                  { key: "role", header: "Role" },
                ]}
                data={sampleUsers}
              />
            </DemoBlock>

            <DemoBlock
              name="Pagination"
              importPath={`import { Pagination } from "@starter-monoropo/ui/organisms/pagination";`}
              contentClassName="w-full max-w-md"
            >
              <Pagination
                page={paginationPage}
                totalPages={5}
                onPageChange={setPaginationPage}
              />
            </DemoBlock>

            <DemoBlock
              name="Breadcrumb"
              importPath={`import { Breadcrumb } from "@starter-monoropo/ui/organisms/breadcrumb";`}
            >
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Design system" },
                ]}
              />
            </DemoBlock>

            <DemoBlock
              name="StatCard & StatsGrid"
              importPath={`import { StatCard, StatsGrid } from "@starter-monoropo/ui/organisms/stats";`}
              contentClassName="w-full"
            >
              <StatsGrid>
                <StatCard title="Users" value="1,284" description="+12% from last month" />
                <StatCard title="Revenue" value="$48.2k" description="Monthly recurring" />
                <StatCard title="Active" value="892" description="Sessions today" />
                <StatCard title="Errors" value="3" description="Last 24 hours" />
              </StatsGrid>
            </DemoBlock>

            <DemoBlock
              name="UserMenu"
              importPath={`import { UserMenu } from "@starter-monoropo/ui/organisms/user-menu";`}
            >
              <UserMenu
                name="Demo User"
                email="demo@example.com"
                onProfile={() => undefined}
                onSettings={() => undefined}
                onLogout={() => undefined}
              />
            </DemoBlock>
          </Section>

          <Section
            id="templates"
            title="Templates"
            description="Full-page shells — scaled previews inside bordered frames."
          >
            <DemoBlock
              name="AuthLayout"
              importPath={`import { AuthLayout } from "@starter-monoropo/ui/templates/auth-layout";`}
              contentClassName="w-full"
            >
              <PreviewFrame minHeight="320px" scale={0.55}>
                <AuthLayout title="Sign in" description="Scaled preview of the auth shell.">
                  <Card>
                    <CardContent className="space-y-3 pt-6">
                      <FormField label="Email" type="email" placeholder="you@example.com" />
                      <Button className="w-full">Continue</Button>
                    </CardContent>
                  </Card>
                </AuthLayout>
              </PreviewFrame>
            </DemoBlock>

            <DemoBlock
              name="DashboardLayout"
              importPath={`import { DashboardLayout } from "@starter-monoropo/ui/templates/dashboard-layout";`}
              contentClassName="w-full"
            >
              <PreviewFrame minHeight="360px" scale={0.5}>
                <DashboardLayout user={{ name: "Demo User", email: "demo@example.com" }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Dashboard content</CardTitle>
                      <CardDescription>Scaled preview with header and sidebar.</CardDescription>
                    </CardHeader>
                  </Card>
                </DashboardLayout>
              </PreviewFrame>
            </DemoBlock>

            <DemoBlock
              name="MarketingLayout"
              importPath={`import { MarketingLayout } from "@starter-monoropo/ui/templates/marketing-layout";`}
              contentClassName="w-full"
            >
              <PreviewFrame minHeight="400px" scale={0.45}>
                <MarketingLayout
                  brand="Starter"
                  navLinks={[
                    { href: "#", label: "Features" },
                    { href: "#", label: "Pricing" },
                  ]}
                >
                  <div className="mx-auto max-w-container px-ui-4 py-ui-12 text-center">
                    <h2 className="text-ui-3xl font-bold">Ship faster</h2>
                    <p className="mt-ui-2 text-muted-foreground">Marketing page content area.</p>
                  </div>
                </MarketingLayout>
              </PreviewFrame>
            </DemoBlock>

            <DemoBlock
              name="SettingsLayout"
              importPath={`import { SettingsLayout } from "@starter-monoropo/ui/templates/settings-layout";`}
              contentClassName="w-full"
            >
              <PreviewFrame minHeight="380px" scale={0.48}>
                <SettingsLayout
                  user={{ name: "Demo User", email: "demo@example.com" }}
                  title="Notifications"
                  description="Choose how you receive updates."
                  breadcrumbs={[
                    { label: "Settings", href: "/dashboard/settings" },
                    { label: "Notifications" },
                  ]}
                  actions={<Button size="sm">Save</Button>}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Settings form content.</p>
                    </CardContent>
                  </Card>
                </SettingsLayout>
              </PreviewFrame>
            </DemoBlock>

            <DemoBlock
              name="BlankLayout"
              importPath={`import { BlankLayout } from "@starter-monoropo/ui/templates/blank-layout";`}
              contentClassName="w-full"
            >
              <PreviewFrame minHeight="240px" scale={0.7}>
                <BlankLayout centered>
                  <Card className="w-full max-w-sm">
                    <CardHeader>
                      <CardTitle>Centered content</CardTitle>
                      <CardDescription>Minimal shell with optional centering.</CardDescription>
                    </CardHeader>
                  </Card>
                </BlankLayout>
              </PreviewFrame>
            </DemoBlock>
          </Section>
        </main>
      </div>
    </div>
  );
}
