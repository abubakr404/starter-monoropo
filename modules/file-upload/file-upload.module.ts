import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { FileUploadController } from "./file-upload.controller";
import { UploadFileHandler } from "./commands/upload-file.handler";
import { AuthModule } from "../auth/auth.module";

/**
 * Optional module: File upload (local/S3)
 * Enable with: pnpm add-module file-upload
 * Requires: AWS_S3_BUCKET, AWS_REGION (for S3) or uses local storage
 */
@Module({
  imports: [CqrsModule, ConfigModule, AuthModule],
  controllers: [FileUploadController],
  providers: [UploadFileHandler],
})
export class FileUploadModule {}
