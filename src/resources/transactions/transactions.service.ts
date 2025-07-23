import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/resources/users/entities/user.entity';
@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction>{
  constructor(@InjectRepository(Transaction) repo) {
    super(repo);
  }

  async saveTransaction(dto: Partial<Transaction>, user: User) {
    const transaction =  this.repo.create({ ...dto, user })
    return await this.repo.save(transaction)
  }
}
