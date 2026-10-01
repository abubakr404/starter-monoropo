import { Module } from "@nestjs/common";
import { MailerModule } from "./mailer.module";
import { MailerService } from "./mailer.service";

/**
 * Optional module: Email via SMTP
 * Enable with: pnpm add-module email
 * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars
 */
@Module({
  imports: [MailerModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class EmailModule {}
