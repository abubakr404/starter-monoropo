import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../../database/prisma.service";
import { UpdateProfileCommand } from "./update-profile.command";

@CommandHandler(UpdateProfileCommand)
@Injectable()
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateProfileCommand) {
    const existing = await this.prisma.user.findUnique({
      where: { id: command.userId },
    });

    if (!existing) {
      throw new NotFoundException("User not found");
    }

    const data: {
      name?: string;
      password?: string;
      preferences?: object;
    } = {};

    if (command.data.name !== undefined) {
      data.name = command.data.name;
    }

    if (command.data.password) {
      data.password = await bcrypt.hash(command.data.password, 12);
    }

    if (command.data.preferences) {
      const current =
        existing.preferences && typeof existing.preferences === "object"
          ? (existing.preferences as Record<string, unknown>)
          : {};
      data.preferences = {
        ...current,
        ...command.data.preferences,
      };
    }

    return this.prisma.user.update({
      where: { id: command.userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        preferences: true,
        updatedAt: true,
      },
    });
  }
}
