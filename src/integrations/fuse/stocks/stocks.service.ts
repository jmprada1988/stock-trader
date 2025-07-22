import { Injectable, Logger } from '@nestjs/common';
import { FuseService } from '@app/integrations/fuse/fuse.service';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class FuseStocksService extends FuseService {
  async getMany(nextToken?: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/stocks${nextToken ? `?nextToken=${nextToken}` : ''}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (e) {
      this.logError(e);
      throw new Error('Failed to fetch stocks from vendor');
    }
  }

  async buyStock(symbol: string, price: number, quantity: number): Promise<any> {
    try {
      const url = `${this.baseUrl}/stocks/${symbol}/buy`;
      const body = { price, quantity };
      const response = await firstValueFrom(this.httpService.post(url, body));
      return response.data;
    } catch (e) {
      this.logError(e);
      const axiosError = e as AxiosError;
      const errorMessage = axiosError.response?.data|| 'Unknown vendor error';
      return {
        status: 'failed',
        reason: errorMessage,
      };
    }
  }
}
