import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheService } from "./cache.service";

/**
 * Optional module: Redis caching
 * Enable with: pnpm add-module redis-cache
 * Requires: REDIS_URL env var
 * Install: pnpm --filter @stater/api add ioredis
 */
@Module({
  imports: [ConfigModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class RedisCacheModule {}
