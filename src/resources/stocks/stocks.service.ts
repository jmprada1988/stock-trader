import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Stock } from '@app/resources/stocks/entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FuseService } from '@app/integrations/fuse/fuse.service';
import { FuseStocksService } from '@app/integrations/fuse/stocks/stocks.service';

@Injectable()
export class StocksService extends TypeOrmCrudService<Stock>{
  constructor(@InjectRepository(Stock) repo, private  readonly stocksService: FuseStocksService) {
    super(repo);
  }

  async exploreAvailableStocks(){
    return this.stocksService.getMany()
  }
}
