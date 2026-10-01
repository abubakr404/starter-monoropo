import { Injectable } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "../../database/prisma.service";
import { GetNotificationsQuery } from "./get-notifications.query";

@QueryHandler(GetNotificationsQuery)
@Injectable()
export class GetNotificationsHandler implements IQueryHandler<GetNotificationsQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetNotificationsQuery) {
    return this.prisma.notification.findMany({
      where: {
        userId: query.userId,
        ...(query.unreadOnly ? { read: false } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
}
