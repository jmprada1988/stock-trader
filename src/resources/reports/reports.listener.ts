import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { UserTransactionsEvent } from '@app/events/events';
import { subDays } from 'date-fns';
import { EmailService } from '@app/notifications/email.service';

@Injectable()
export class ReportsListener {
  constructor(
    @InjectRepository(Transaction)
    private readonly txRepo: Repository<Transaction>,
    private readonly emailService: EmailService,
  ) {}

  @OnEvent(UserTransactionsEvent.name)
  async handle(event: UserTransactionsEvent) {
    console.log('Processing event::', event)
    const yesterday = subDays(new Date(), 1);

    const startUTC = new Date(Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate(),
      0, 0, 0, 0
    ));

    const endUTC = new Date(Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate(),
      23, 59, 59, 999
    ));

    const transactions = await this.txRepo.find({
      where: {
        user: { id: event.userId },
        createdAt: Between(startUTC, endUTC),
      },
      relations: ['user'],
    });




    console.log('transactions', transactions)
    if (!transactions.length) return;

    const email = transactions[0].user.email;
    const summary = transactions.reduce(
      (acc, tx) => {
        acc[tx.status]++;
        return acc;
      },
      { success: 0, failed: 0 },
    );

    console.log('transactions summary', summary)

    await this.emailService.notify(email, {
      subject: '📊 Daily Transaction Summary',
      body: '✅ Success: 3\n❌ Failed: 2',
    });

  }
}
