import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";
import { PrismaService } from "../../database/prisma.service";

export interface AuthUserPayload {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

@Injectable()
export class AuthTokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async issueTokens(user: AuthUserPayload) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    const refreshToken = randomBytes(40).toString("hex");
    const expiresAt = this.refreshExpiresAt();

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async rotateRefreshToken(currentToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: currentToken },
      include: {
        user: {
          select: { id: true, email: true, name: true, role: true },
        },
      },
    });

    if (!stored || stored.expiresAt < new Date()) {
      if (stored) {
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
      }
      return null;
    }

    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    return this.issueTokens(stored.user);
  }

  async revokeRefreshToken(token: string, userId?: string) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        token,
        ...(userId ? { userId } : {}),
      },
    });
  }

  async revokeAllForUser(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }

  private refreshExpiresAt(): Date {
    const raw = this.config.get<string>("JWT_REFRESH_EXPIRES_IN", "7d");
    const match = /^(\d+)([smhd])$/.exec(raw);
    const amount = match ? Number(match[1]) : 7;
    const unit = match?.[2] ?? "d";
    const ms =
      unit === "s"
        ? amount * 1000
        : unit === "m"
          ? amount * 60_000
          : unit === "h"
            ? amount * 3_600_000
            : amount * 86_400_000;

    return new Date(Date.now() + ms);
  }
}
