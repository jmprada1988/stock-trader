import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { FuseModule } from '@app/integrations/fuse/fuse.module';
import { UsersModule } from '@app/resources/users/users.module';
import { TransactionsModule } from '@app/resources/transactions/transactions.module';
import { PortfoliosModule } from '@app/resources/portfolios/portfolios.module';

@Module({
  imports: [FuseModule, UsersModule, TransactionsModule, PortfoliosModule],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
