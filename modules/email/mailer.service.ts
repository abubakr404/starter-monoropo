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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transporter: any = null;

  constructor(private readonly config: ConfigService) {}

  private async getTransporter() {
    if (this.transporter) return this.transporter;

    const host = this.config.get<string>("SMTP_HOST");
    if (!host) return null;

    try {
      const nodemailer = await import("nodemailer");
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(this.config.get("SMTP_PORT") ?? 587),
        secure: false,
        auth: {
          user: this.config.get<string>("SMTP_USER"),
          pass: this.config.get<string>("SMTP_PASS"),
        },
      });
      return this.transporter;
    } catch {
      this.logger.warn(
        "nodemailer is not installed. Run: pnpm --filter @starter-monoropo/api add nodemailer @types/nodemailer",
      );
      return null;
    }
  }

  async send(options: SendEmailOptions): Promise<void> {
    const transporter = await this.getTransporter();

    if (!transporter) {
      this.logger.warn(`Email skipped (SMTP not configured): ${options.subject} → ${options.to}`);
      return;
    }

    await transporter.sendMail({
      from: this.config.get<string>("SMTP_USER"),
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    this.logger.log(`Email sent: ${options.subject} → ${options.to}`);
  }
}
