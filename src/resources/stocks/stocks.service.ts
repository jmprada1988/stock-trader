import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Stock } from '@app/resources/stocks/entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StocksService extends TypeOrmCrudService<Stock>{
  constructor(@InjectRepository(Stock) repo) {
    super(repo);
  }
}
