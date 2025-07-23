import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Logger, Module } from '@nestjs/common';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { User } from '@app/resources/users/entities/user.entity';
import { DatabaseService } from '@app/config/database.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger(DatasourceModule.name);
        // using the factory function to create the datasource instance
        try {
          const sslOption =
            configService.get<string>('DB_SSL') === 'false'
              ? false
              : { rejectUnauthorized: false };

          const dataSource = new DataSource({
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            synchronize: true, // Recommended to be false in production
            migrations: ['dist/migrations/*{.ts,.js}'],
            entities: [Portfolio, Transaction, User], // this will automatically load all entity file in the src folder
            logging:
              configService.get('NODE_ENV') === 'prod'
                ? ['error']
                : ['error', 'query'],
            migrationsRun: false,
            ssl: sslOption, // Dynamically set SSL option
          });
          await dataSource.initialize(); // initialize the data source
          logger.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.error('Error connecting to database', error);
          throw error;
        }
      },
    },
    DatabaseService,
  ],
  exports: [DataSource, DatabaseService],
})
export class DatasourceModule {}
