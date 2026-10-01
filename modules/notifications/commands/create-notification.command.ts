export class CreateNotificationCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly message: string,
    public readonly type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" = "INFO",
  ) {}
}
