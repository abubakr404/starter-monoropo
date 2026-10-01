import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { NotificationsController } from "./notifications.controller";
import { GetNotificationsHandler } from "./queries/get-notifications.handler";
import { MarkNotificationReadHandler } from "./commands/mark-notification-read.handler";
import { CreateNotificationHandler } from "./commands/create-notification.handler";
import { AuthModule } from "../auth/auth.module";

/**
 * Optional module: In-app notifications
 * Enable with: pnpm add-module notifications
 */
@Module({
  imports: [CqrsModule, ConfigModule, AuthModule],
  controllers: [NotificationsController],
  providers: [
    GetNotificationsHandler,
    MarkNotificationReadHandler,
    CreateNotificationHandler,
  ],
  exports: [CreateNotificationHandler],
})
export class NotificationsModule {}
