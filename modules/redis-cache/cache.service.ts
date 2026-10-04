import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

type RedisLike = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: string, ttl: number): Promise<unknown>;
  del(key: string): Promise<unknown>;
  quit(): Promise<unknown>;
};

@Injectable()
export class CacheService implements OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private memory = new Map<string, { value: string; expiresAt: number }>();
  private redis: RedisLike | null = null;
  private initPromise: Promise<void>;

  constructor(private readonly config: ConfigService) {
    this.initPromise = this.initRedis();
  }

  private async initRedis() {
    const redisUrl = this.config.get<string>("REDIS_URL");
    if (!redisUrl) return;

    try {
      const { default: Redis } = await import("ioredis");
      this.redis = new Redis(redisUrl) as unknown as RedisLike;
      this.logger.log("Connected to Redis");
    } catch {
      this.logger.warn(
        "REDIS_URL set but ioredis is missing — using in-memory cache. Install: pnpm --filter @starter-monoropo/api add ioredis",
      );
    }
  }

  async get(key: string): Promise<string | null> {
    await this.initPromise;

    if (this.redis) {
      return this.redis.get(key);
    }

    const entry = this.memory.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.memory.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds = 3600): Promise<void> {
    await this.initPromise;

    if (this.redis) {
      await this.redis.set(key, value, "EX", ttlSeconds);
      return;
    }

    this.memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  }

  async del(key: string): Promise<void> {
    await this.initPromise;

    if (this.redis) {
      await this.redis.del(key);
      return;
    }

    this.memory.delete(key);
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit();
      this.redis = null;
    }
    this.memory.clear();
  }
}
