import { Injectable, NotFoundException } from '@nestjs/common';
import { FuseStocksService } from '@app/integrations/fuse/stocks/stocks.service';
import { BuyStockDto } from '@app/resources/stocks/dto/buy-stock.dto';
import { UsersService } from '@app/resources/users/users.service';
import { TransactionsService } from '@app/resources/transactions/transactions.service';
import { PortfoliosService } from '@app/resources/portfolios/portfolios.service';

@Injectable()
export class StocksService {
  constructor(
    private  readonly stocksService: FuseStocksService,
    private readonly usersService: UsersService,
    private readonly transactionsService: TransactionsService,
    private readonly portfolioService: PortfoliosService

  ) {
  }

  async exploreAvailableStocks(nextToken?: string){
    return this.stocksService.getMany(nextToken)
  }
  async buyStock(dto: BuyStockDto) {
    console.log(dto)
    const { user, symbol, quantity } = dto;
    const userInstance = await this.usersService.findOne({ where: { id: user } });

    if (!user) throw new NotFoundException('User not found');





    // ----- Try to buy from Fuse -----
    const result = await this.stocksService.buyStock(symbol, dto.price, quantity);

    const status = result?.status === 200 ? 'success' : 'failed';
    const failureReason = result?.reason || (status === 'failed' ? 'Vendor rejected purchase' : null);

    await  this.transactionsService.saveTransaction({
      stock: symbol,
      price: dto.price,
      quantity,
      status,
      failureReason
    }, userInstance)
    if (status === 'success') {
      return await this.portfolioService.saveHolding(dto, quantity, userInstance)
    }

    return {
      status,
      price: dto.price,
      quantity,
      reason: failureReason,
    };
  }
}
