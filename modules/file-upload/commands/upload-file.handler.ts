import { BadRequestException, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { UploadFileCommand } from "./upload-file.command";

@CommandHandler(UploadFileCommand)
@Injectable()
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  async execute(command: UploadFileCommand) {
    const { file } = command;

    if (!file) {
      throw new BadRequestException("No file provided");
    }

    const uploadDir = join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${randomUUID()}-${file.originalname}`;
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, file.buffer);

    return {
      filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/${filename}`,
    };
  }
}
