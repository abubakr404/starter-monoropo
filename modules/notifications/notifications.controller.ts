import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { GetNotificationsQuery } from "./queries/get-notifications.query";
import { MarkNotificationReadCommand } from "./commands/mark-notification-read.command";

@ApiTags("notifications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("notifications")
export class NotificationsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }, @Query("unreadOnly") unreadOnly?: string) {
    return this.queryBus.execute(
      new GetNotificationsQuery(user.id, unreadOnly === "true"),
    );
  }

  @Patch(":id/read")
  markRead(@Param("id") id: string, @CurrentUser() user: { id: string }) {
    return this.commandBus.execute(new MarkNotificationReadCommand(id, user.id));
  }
}
