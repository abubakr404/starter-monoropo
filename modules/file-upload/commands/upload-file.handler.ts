import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { UploadFileCommand } from "./upload-file.command";

@CommandHandler(UploadFileCommand)
@Injectable()
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  private readonly logger = new Logger(UploadFileHandler.name);

  constructor(private readonly config: ConfigService) {}

  async execute(command: UploadFileCommand) {
    const { file } = command;

    if (!file) {
      throw new BadRequestException("No file provided");
    }

    const bucket = this.config.get<string>("AWS_S3_BUCKET");
    if (bucket) {
      return this.uploadToS3(file, bucket);
    }

    return this.uploadLocal(file);
  }

  private async uploadLocal(file: Express.Multer.File) {
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
      storage: "local" as const,
    };
  }

  private async uploadToS3(file: Express.Multer.File, bucket: string) {
    const region = this.config.get<string>("AWS_REGION", "us-east-1");
    const filename = `${randomUUID()}-${file.originalname}`;

    try {
      const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
      const client = new S3Client({
        region,
        credentials: {
          accessKeyId: this.config.get<string>("AWS_ACCESS_KEY_ID", ""),
          secretAccessKey: this.config.get<string>("AWS_SECRET_ACCESS_KEY", ""),
        },
      });

      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: filename,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return {
        filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        url: `https://${bucket}.s3.${region}.amazonaws.com/${filename}`,
        storage: "s3" as const,
      };
    } catch (err) {
      this.logger.warn(
        "S3 upload failed — install @aws-sdk/client-s3 or check credentials. Falling back to local storage.",
      );
      this.logger.debug(String(err));
      return this.uploadLocal(file);
    }
  }
}
