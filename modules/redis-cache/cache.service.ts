import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CacheService implements OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private memory = new Map<string, { value: string; expiresAt: number }>();

  constructor(private readonly config: ConfigService) {
    const redisUrl = this.config.get<string>("REDIS_URL");
    if (redisUrl) {
      this.logger.log("Redis URL configured — install ioredis to enable");
    }
  }

  async get(key: string): Promise<string | null> {
    const entry = this.memory.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.memory.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds = 3600): Promise<void> {
    this.memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  }

  async del(key: string): Promise<void> {
    this.memory.delete(key);
  }

  onModuleDestroy() {
    this.memory.clear();
  }
}
