export type UserPreferences = {
  emailAlerts?: boolean;
  productUpdates?: boolean;
};

export type AuthProfile = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  preferences: UserPreferences | null;
  createdAt?: Date;
  updatedAt: Date;
};

export function toUserPreferences(value: unknown): UserPreferences | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as UserPreferences;
}
