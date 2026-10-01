import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "../../../database/prisma.service";
import { DeleteUserCommand } from "./delete-user.command";

@CommandHandler(DeleteUserCommand)
@Injectable()
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteUserCommand) {
    try {
      await this.prisma.user.delete({ where: { id: command.id } });
      return { deleted: true };
    } catch {
      throw new NotFoundException("User not found");
    }
  }
}
