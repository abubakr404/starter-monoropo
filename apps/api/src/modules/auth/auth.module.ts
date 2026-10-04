import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthTokensService } from "./auth-tokens.service";
import { RegisterHandler } from "./commands/register.handler";
import { LoginHandler } from "./commands/login.handler";
import { RefreshHandler } from "./commands/refresh.handler";
import { LogoutHandler } from "./commands/logout.handler";
import { UpdateProfileHandler } from "./commands/update-profile.handler";
import { GetProfileHandler } from "./queries/get-profile.handler";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET", "change-me"),
        signOptions: {
          expiresIn: config.get("JWT_EXPIRES_IN", "15m") as `${number}${"s" | "m" | "h" | "d"}`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthTokensService,
    RegisterHandler,
    LoginHandler,
    RefreshHandler,
    LogoutHandler,
    UpdateProfileHandler,
    GetProfileHandler,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
