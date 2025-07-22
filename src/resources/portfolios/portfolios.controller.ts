import { Controller } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import {  PortfolioDto } from './dto/portfolio.dto';
import { Crud, CrudController } from '@dataui/crud';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: { type: Portfolio},
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: {
    create: PortfolioDto,
    update: PortfolioDto,
  },
  serialize: { get: PortfolioDto, getMany: PortfolioDto }
})
@Controller('portfolios')
@ApiTags('Portfolios')
export class PortfoliosController implements  CrudController<Portfolio>{
  constructor(public readonly service: PortfoliosService) {}
}
