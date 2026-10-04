/**
 * Starter template configuration (documentation + CLI only).
 * Runtime AppModule imports are static; enable modules with `pnpm add-module <name>`,
 * which copies sources into apps/api and flips the flags below.
 */
export const starterConfig = {
  /** Project display name */
  name: "starter-monoropo",

  /** Enabled backend modules (NestJS) */
  modules: {
    auth: true,
    users: true,
    health: true,
    fileUpload: false,
    email: false,
    redisCache: false,
    notifications: false,
    rateLimit: false,
  },

  /** Enabled frontend features (Next.js) */
  features: {
    authPages: true,
    dashboard: true,
    darkMode: true,
    dataTable: true,
    forms: true,
  },
} as const;

export type StarterModule = keyof typeof starterConfig.modules;
export type StarterFeature = keyof typeof starterConfig.features;
