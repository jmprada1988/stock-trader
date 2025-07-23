import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsScheduler } from './reports.scheduler';
import { ReportsListener } from './reports.listener';
import { User } from '@app/resources/users/entities/user.entity';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { NotificationsModule } from '@app/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction]), NotificationsModule],
  providers: [ReportsScheduler, ReportsListener],
})
export class ReportsModule {}
