import { Module } from '@nestjs/common';
import { FuseService } from '@app/integrations/fuse/fuse.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { FuseStocksService } from '@app/integrations/fuse/stocks/stocks.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [FuseService, FuseStocksService],
  exports: [FuseService, FuseStocksService]
})

export class FuseModule {}