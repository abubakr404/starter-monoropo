import { Injectable, NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "../../../database/prisma.service";
import { AuthProfile, toUserPreferences } from "../types/profile";
import { GetProfileQuery } from "./get-profile.query";

@QueryHandler(GetProfileQuery)
@Injectable()
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetProfileQuery): Promise<AuthProfile> {
    const user = await this.prisma.user.findUnique({
      where: { id: query.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      preferences: toUserPreferences(user.preferences),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
