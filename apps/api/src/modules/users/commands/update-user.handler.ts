import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../../database/prisma.service";
import { UpdateUserCommand } from "./update-user.command";

@CommandHandler(UpdateUserCommand)
@Injectable()
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateUserCommand) {
    const existing = await this.prisma.user.findUnique({
      where: { id: command.id },
    });

    if (!existing) {
      throw new NotFoundException("User not found");
    }

    const data: { name?: string; password?: string } = {};

    if (command.data.name !== undefined) {
      data.name = command.data.name;
    }

    if (command.data.password) {
      data.password = await bcrypt.hash(command.data.password, 12);
    }

    return this.prisma.user.update({
      where: { id: command.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });
  }
}
