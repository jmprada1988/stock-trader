import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction>{
  constructor(@InjectRepository(Transaction) repo) {
    super(repo);
  }
}
