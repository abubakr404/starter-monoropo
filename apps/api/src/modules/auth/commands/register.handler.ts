import { ConflictException, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../../database/prisma.service";
import { RegisterCommand } from "./register.command";

@CommandHandler(RegisterCommand)
@Injectable()
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand) {
    const existing = await this.prisma.user.findUnique({
      where: { email: command.email },
    });

    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(command.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: command.email,
        password: hashedPassword,
        name: command.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });

    return { user, accessToken };
  }
}
