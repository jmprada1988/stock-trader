import { EmailService } from '@app/notifications/email.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class NotificationsModule {}
