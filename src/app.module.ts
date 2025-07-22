import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import winstonConfig from './logger/winston.config';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import { UsersModule } from './resources/users/users.module';
import { StocksModule } from './resources/stocks/stocks.module';
import { PortfoliosModule } from './resources/portfolios/portfolios.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { DatasourceModule } from '@app/config/datasource.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
      envFilePath: ['.env'],
      isGlobal: true,
      load: [winstonConfig],
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        createLogger(configService.get('winston')),
      inject: [ConfigService],
    }),
    DatasourceModule,
    UsersModule,
    StocksModule,
    PortfoliosModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
