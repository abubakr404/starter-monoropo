import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthTokensService } from "../auth-tokens.service";
import { RefreshCommand } from "./refresh.command";

@CommandHandler(RefreshCommand)
@Injectable()
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
  constructor(private readonly tokens: AuthTokensService) {}

  async execute(command: RefreshCommand) {
    const result = await this.tokens.rotateRefreshToken(command.refreshToken);
    if (!result) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
    return result;
  }
}
