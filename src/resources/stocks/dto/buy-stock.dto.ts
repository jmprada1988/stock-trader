import { IsUUID, IsString, IsInt, Min, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyStockDto {
  @ApiProperty({type: 'string', format: 'uuid'})
  @IsUUID()
  user: string;

  @ApiProperty({type: 'string', example: 'NVDA'})
  @IsString()
  symbol: string;

  @ApiProperty({type: 'number', example: 1})
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({type: 'number', example: 0.34})
  @IsNumber()
  price: number;
}
