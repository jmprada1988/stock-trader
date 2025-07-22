import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfoliosService extends  TypeOrmCrudService<Portfolio>{
  constructor(@InjectRepository(Portfolio) repo) {
    super(repo);
  }
}
