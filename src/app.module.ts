import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import winstonConfig from './logger/winston.config'
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
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
      useFactory: (configService: ConfigService) => createLogger(configService.get('winston')),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
