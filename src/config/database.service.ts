import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private static testDataSource: DataSource;
  private isTestEnvironment: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    this.isTestEnvironment = configService.get('NODE_ENV') === 'test';
  }

  async getTestDataSource(): Promise<DataSource> {
    if (DatabaseService.testDataSource?.isInitialized) {
      return DatabaseService.testDataSource;
    }

    DatabaseService.testDataSource = this.dataSource;
    if (!DatabaseService.testDataSource.isInitialized) {
      await DatabaseService.testDataSource.initialize();
    }
    return DatabaseService.testDataSource;
  }

  async onModuleDestroy() {
    if (!this.isTestEnvironment && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
}
