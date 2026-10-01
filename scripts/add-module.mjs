#!/usr/bin/env node

import { cpSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const MODULES = {
  notifications: {
    description: "In-app notifications CRUD",
    importName: "NotificationsModule",
    importPath: "./modules/notifications/notifications.module",
    deps: [],
  },
  email: {
    description: "SMTP email service",
    importName: "EmailModule",
    importPath: "./modules/email/email.module",
    deps: ["nodemailer"],
  },
  "redis-cache": {
    description: "Redis caching layer",
    importName: "RedisCacheModule",
    importPath: "./modules/redis-cache/redis-cache.module",
    deps: ["ioredis"],
  },
  "file-upload": {
    description: "File upload (local/S3)",
    importName: "FileUploadModule",
    importPath: "./modules/file-upload/file-upload.module",
    deps: [],
  },
  "rate-limit": {
    description: "Advanced rate limiting guard",
    importName: "RateLimitModule",
    importPath: "./modules/rate-limit/rate-limit.module",
    deps: [],
  },
};

const moduleName = process.argv[2];

if (!moduleName || moduleName === "--help") {
  console.log("\nUsage: pnpm add-module <module-name>\n");
  console.log("Available modules:\n");
  for (const [name, info] of Object.entries(MODULES)) {
    console.log(`  ${name.padEnd(18)} ${info.description}`);
  }
  console.log("");
  process.exit(0);
}

const mod = MODULES[moduleName];
if (!mod) {
  console.error(`Unknown module: ${moduleName}`);
  console.error(`Available: ${Object.keys(MODULES).join(", ")}`);
  process.exit(1);
}

const srcDir = join(root, "modules", moduleName);
const destDir = join(root, "apps", "api", "src", "modules", moduleName);

if (!existsSync(srcDir)) {
  console.error(`Module source not found: ${srcDir}`);
  process.exit(1);
}

if (existsSync(destDir)) {
  console.error(`Module already installed at: ${destDir}`);
  process.exit(1);
}

console.log(`Installing module: ${moduleName}`);
cpSync(srcDir, destDir, { recursive: true });

const appModulePath = join(root, "apps", "api", "src", "app.module.ts");
let appModule = readFileSync(appModulePath, "utf-8");

const importLine = `import { ${mod.importName} } from "${mod.importPath.replace("./modules/", "./modules/")}";`;

if (!appModule.includes(mod.importName)) {
  const lastImport = appModule.lastIndexOf("import ");
  const insertPos = appModule.indexOf("\n", lastImport) + 1;
  appModule = appModule.slice(0, insertPos) + importLine + "\n" + appModule.slice(insertPos);

  appModule = appModule.replace(
    /imports:\s*\[/,
    `imports: [\n    ${mod.importName},`,
  );

  writeFileSync(appModulePath, appModule);
}

const configPath = join(root, "stater.config.ts");
let config = readFileSync(configPath, "utf-8");
const configKey = moduleName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
config = config.replace(
  new RegExp(`${configKey}:\\s*false`),
  `${configKey}: true`,
);
writeFileSync(configPath, config);

console.log(`✓ Copied module to apps/api/src/modules/${moduleName}`);
console.log(`✓ Registered ${mod.importName} in app.module.ts`);
console.log(`✓ Updated stater.config.ts`);

if (mod.deps.length) {
  console.log(`\nInstall dependencies:`);
  console.log(`  pnpm --filter @stater/api add ${mod.deps.join(" ")}`);
}

console.log(`\nDone! Restart the API server to apply changes.`);
