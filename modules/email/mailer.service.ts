import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(private readonly config: ConfigService) {}

  async send(options: SendEmailOptions): Promise<void> {
    const host = this.config.get<string>("SMTP_HOST");

    if (!host) {
      this.logger.warn(`Email skipped (SMTP not configured): ${options.subject} → ${options.to}`);
      return;
    }

    // Install nodemailer when enabling this module:
    // pnpm --filter @stater/api add nodemailer @types/nodemailer
    this.logger.log(`[Email] ${options.subject} → ${options.to}`);
  }
}
