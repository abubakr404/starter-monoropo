import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "../auth/auth.module";
import { UsersController } from "./users.controller";
import { GetUsersHandler } from "./queries/get-users.handler";
import { GetUserByIdHandler } from "./queries/get-user-by-id.handler";
import { UpdateUserHandler } from "./commands/update-user.handler";
import { DeleteUserHandler } from "./commands/delete-user.handler";

@Module({
  imports: [CqrsModule, AuthModule],
  controllers: [UsersController],
  providers: [
    GetUsersHandler,
    GetUserByIdHandler,
    UpdateUserHandler,
    DeleteUserHandler,
  ],
})
export class UsersModule {}
