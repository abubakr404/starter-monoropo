import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UploadFileCommand } from "./commands/upload-file.command";

@ApiTags("files")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("files")
export class FileUploadController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.commandBus.execute(new UploadFileCommand(file));
  }
}
