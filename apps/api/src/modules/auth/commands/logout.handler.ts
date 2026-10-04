import { Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthTokensService } from "../auth-tokens.service";
import { LogoutCommand } from "./logout.command";

@CommandHandler(LogoutCommand)
@Injectable()
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(private readonly tokens: AuthTokensService) {}

  async execute(command: LogoutCommand) {
    if (command.refreshToken) {
      await this.tokens.revokeRefreshToken(command.refreshToken, command.userId);
    } else {
      await this.tokens.revokeAllForUser(command.userId);
    }
    return { success: true };
  }
}
