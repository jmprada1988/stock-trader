import { Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Crud, CrudController } from '@dataui/crud';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { ApiTags } from '@nestjs/swagger';
import { TransactionDto } from '@app/resources/transactions/dto/transaction.dto';

@Crud({
  model: { type: Transaction},
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: { create: TransactionDto },
  serialize: {
    create: TransactionDto, get: TransactionDto, getMany: TransactionDto, update: TransactionDto, replace: TransactionDto
  }
})

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController implements  CrudController<Transaction> {
  constructor(public readonly service: TransactionsService) {}
}
