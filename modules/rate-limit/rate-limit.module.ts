import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

/**
 * Optional module: Stricter rate limiting
 * Enable with: pnpm add-module rate-limit
 *
 * Note: basic ThrottlerModule is already registered in AppModule.
 * This module adds a global ThrottlerGuard with tighter defaults.
 */
@Module({
  imports: [
    ThrottlerModule.forRoot([
      { name: "short", ttl: 1000, limit: 3 },
      { name: "medium", ttl: 10000, limit: 20 },
      { name: "long", ttl: 60000, limit: 100 },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class RateLimitModule {}
