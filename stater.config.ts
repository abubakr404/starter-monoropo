/**
 * Stater template configuration.
 * Toggle optional modules here or run `pnpm add-module <name>`.
 */
export const staterConfig = {
  /** Project display name */
  name: "stater",

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

export type StaterModule = keyof typeof staterConfig.modules;
export type StaterFeature = keyof typeof staterConfig.features;
