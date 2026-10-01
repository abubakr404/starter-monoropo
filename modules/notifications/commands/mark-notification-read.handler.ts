import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "../../database/prisma.service";
import { MarkNotificationReadCommand } from "./mark-notification-read.command";

@CommandHandler(MarkNotificationReadCommand)
@Injectable()
export class MarkNotificationReadHandler
  implements ICommandHandler<MarkNotificationReadCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: MarkNotificationReadCommand) {
    const notification = await this.prisma.notification.findFirst({
      where: { id: command.id, userId: command.userId },
    });

    if (!notification) {
      throw new NotFoundException("Notification not found");
    }

    return this.prisma.notification.update({
      where: { id: command.id },
      data: { read: true },
    });
  }
}
