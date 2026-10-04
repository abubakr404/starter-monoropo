import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RegisterCommand } from "./commands/register.command";
import { LoginCommand } from "./commands/login.command";
import { RefreshCommand } from "./commands/refresh.command";
import { LogoutCommand } from "./commands/logout.command";
import { UpdateProfileCommand } from "./commands/update-profile.command";
import { GetProfileQuery } from "./queries/get-profile.query";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LogoutDto, RefreshDto } from "./dto/refresh.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(dto.email, dto.password, dto.name));
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(dto.email, dto.password));
  }

  @Post("refresh")
  refresh(@Body() dto: RefreshDto) {
    return this.commandBus.execute(new RefreshCommand(dto.refreshToken));
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  logout(@CurrentUser() user: { id: string }, @Body() dto: LogoutDto) {
    return this.commandBus.execute(new LogoutCommand(user.id, dto.refreshToken));
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  profile(@CurrentUser() user: { id: string }) {
    return this.queryBus.execute(new GetProfileQuery(user.id));
  }

  @Patch("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateProfile(@CurrentUser() user: { id: string }, @Body() dto: UpdateProfileDto) {
    return this.commandBus.execute(
      new UpdateProfileCommand(user.id, {
        name: dto.name,
        password: dto.password,
        preferences: dto.preferences,
      }),
    );
  }
}
