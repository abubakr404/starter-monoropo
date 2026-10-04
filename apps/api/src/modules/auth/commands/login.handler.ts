import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../../database/prisma.service";
import { AuthTokensService } from "../auth-tokens.service";
import { LoginCommand } from "./login.command";

@CommandHandler(LoginCommand)
@Injectable()
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: AuthTokensService,
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.prisma.user.findUnique({
      where: { email: command.email },
    });

    if (!user || !(await bcrypt.compare(command.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.tokens.issueTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }
}
