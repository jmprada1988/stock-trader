import 'reflect-metadata';
import './config/crud.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

// Logging
import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';
import packageInfo from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const winstonLogger = WinstonModule.createLogger(
    createLogger(configService.get('winston')),
  );
  // Log application version with Winston instead of console.log
  winstonLogger.log(`App Version: ${packageInfo.version}`);

  // Configure global middlewares
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();
  // Swagger configuration
  const isSwaggerEnabled = process.env.ENABLE_SWAGGER !== 'false';

  if (isSwaggerEnabled) {
    const swaggerOption = new DocumentBuilder()
      .setTitle('Stock Broker API')
      .setDescription('Place orders directly without going to your broker')
      .setVersion(packageInfo.version)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOption);

    // Add tags to document in the desired order
    document.tags = [
      { name: 'Users', description: 'Operations related to users' },
      { name: 'Stocks', description: 'Operations related to stocks' },
      { name: 'Portfolio', description: 'Operations related to portfolio' },
      {
        name: 'Transaction',
        description: 'Operations related to transactions',
      },
    ];

    SwaggerModule.setup('api', app, document);
    winstonLogger.log('Swagger documentation enabled');
  } else {
    winstonLogger.log('Swagger documentation disabled - for faster startup');
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
