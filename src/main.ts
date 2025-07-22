import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

// Logging
import { createLogger } from 'winston'
import { WinstonModule } from 'nest-winston'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  const winstonLogger = WinstonModule.createLogger(createLogger(configService.get('winston')))
  // Swagger configuration
  const isSwaggerEnabled = process.env.ENABLE_SWAGGER !== 'false'

  if (isSwaggerEnabled) {
    const swaggerOption = new DocumentBuilder()
      .setTitle('Stock Broker API')
      .setDescription('Place orders directly without going to your broker')
      .setVersion('0.0.1') // this can be imported from the package.json
      .build()

    const document = SwaggerModule.createDocument(app, swaggerOption)

    // Add tags to document in the desired order
    document.tags = [
      { name: 'Users', description: 'Operations related to users' },
      { name: 'Stocks', description: 'Operations related to stocks' },
      { name: 'Portfolio', description: 'Operations related to portfolio' },
      { name: 'Transaction', description: 'Operations related to transactions' },
    ]

    SwaggerModule.setup('api', app, document)
    winstonLogger.log('Swagger documentation enabled')
  } else {
    winstonLogger.log('Swagger documentation disabled - for faster startup')
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
