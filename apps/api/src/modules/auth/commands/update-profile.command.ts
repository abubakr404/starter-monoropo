export class UpdateProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly data: {
      name?: string;
      password?: string;
      preferences?: {
        emailAlerts?: boolean;
        productUpdates?: boolean;
      };
    },
  ) {}
}
