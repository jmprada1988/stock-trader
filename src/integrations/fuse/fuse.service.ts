import { Injectable, Logger } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory, HttpService } from '@nestjs/axios';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FuseService implements HttpModuleOptionsFactory {
  protected logger = new Logger(FuseService.name)
  protected readonly baseUrl: string
  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService) {
    this.baseUrl = configService.get('FUSE_API_URL')
    this.setupInterceptor()
  }

  createHttpOptions(): HttpModuleOptions {
    return
  }
  logError(error: unknown): void {
    if (error instanceof Error) {
      this.logger.error('Error message:', error.message)
    } else {
      this.logger.error('Unknown error:', error)
    }
  }
  // Setup Axios interceptor to automatically attach credentials to every request
  private setupInterceptor(): void {
    this.httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        config.headers.set('x-api-key', `${this.configService.get('FUSE_API_KEY')}`)
        config.headers.set('Content-Type', 'application/json')
        return config
      },
      (error: AxiosError): Promise<AxiosError> => {
        // Return a rejected promise in case of an error
        return Promise.reject(error)
      },
    )
  }
}