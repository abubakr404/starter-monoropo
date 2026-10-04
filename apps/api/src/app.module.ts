import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ThrottlerModule } from "@nestjs/throttler";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./modules/health/health.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, "../../../.env"),
        join(process.cwd(), "../../.env"),
        join(process.cwd(), ".env"),
      ],
    }),
    CqrsModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
