import { Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "../../database/prisma.service";
import { CreateNotificationCommand } from "./create-notification.command";

@CommandHandler(CreateNotificationCommand)
@Injectable()
export class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateNotificationCommand) {
    return this.prisma.notification.create({
      data: {
        userId: command.userId,
        title: command.title,
        message: command.message,
        type: command.type,
      },
    });
  }
}
