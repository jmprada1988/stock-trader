import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@app/resources/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserTransactionsEvent } from '@app/events/events';

@Injectable()
export class ReportsScheduler {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async emitTransactionReports() {
    const users = await this.userRepo.find({ select: ['id'] });

    for (const user of users) {
      this.eventEmitter.emit(UserTransactionsEvent.name, new UserTransactionsEvent(user.id));
    }
  }
}
