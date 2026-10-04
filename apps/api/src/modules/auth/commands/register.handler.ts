import { ConflictException, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../../database/prisma.service";
import { AuthTokensService } from "../auth-tokens.service";
import { RegisterCommand } from "./register.command";

@CommandHandler(RegisterCommand)
@Injectable()
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: AuthTokensService,
  ) {}

  async execute(command: RegisterCommand) {
    const existing = await this.prisma.user.findUnique({
      where: { email: command.email },
    });

    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(command.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: command.email,
        password: hashedPassword,
        name: command.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return this.tokens.issueTokens(user);
  }
}
