import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUsersQuery } from "./queries/get-users.query";
import { GetUserByIdQuery } from "./queries/get-user-by-id.query";
import { UpdateUserCommand } from "./commands/update-user.command";
import { DeleteUserCommand } from "./commands/delete-user.command";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.queryBus.execute(new GetUsersQuery(pagination.page, pagination.limit));
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(id, dto));
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
