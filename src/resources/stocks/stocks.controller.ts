import { Controller } from '@nestjs/common';
import { StocksService } from './stocks.service';

import { Crud, CrudController } from '@dataui/crud';
import { Stock } from '@app/resources/stocks/entities/stock.entity';
@Crud({
  model: { type: Stock},
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: { create: Stock, update: Stock },
  serialize: {
    create: Stock,
    get: Stock,
    getMany: Stock
  }
})
@Controller('stocks')
export class StocksController implements CrudController<Stock>{
  constructor(public readonly service: StocksService) {}
}
