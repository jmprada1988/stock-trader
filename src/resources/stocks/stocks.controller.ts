import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { BuyStockDto } from '@app/resources/stocks/dto/buy-stock.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('stocks')
@ApiTags('Available Stocks')
export class StocksController {
  constructor(public readonly service: StocksService) {}

  @Get()
  @ApiOperation({ summary: 'Explore available stocks from vendor' })
  @ApiQuery({ name: 'nextToken', required: false, description: 'Pagination token for vendor stocks' })
  @ApiResponse({ status: 200, description: 'List of available stocks with optional pagination' })
  async exploreAvailableStocks(@Query('nextToken') nextToken?: string) {
    return this.service.exploreAvailableStocks(nextToken);
  }

  @Post('purchase')
  @ApiOperation({ summary: 'Buy a stock from the vendor' })
  @ApiBody({ type: BuyStockDto })
  @ApiResponse({ status: 201, description: 'Transaction result: success or failure' })
  async buyStock(@Body() dto: BuyStockDto): Promise<any> {
    return this.service.buyStock(dto);
  }
}
