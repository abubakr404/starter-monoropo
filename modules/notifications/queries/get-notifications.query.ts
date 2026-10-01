export class GetNotificationsQuery {
  constructor(
    public readonly userId: string,
    public readonly unreadOnly: boolean,
  ) {}
}
