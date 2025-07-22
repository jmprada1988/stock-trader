import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ type: 'string', format: 'uuid'})
  id: string;

  @ApiProperty({ type: 'string'})
  user: string;

  @ApiProperty({ type: 'string'})
  stock: string;

  @ApiProperty({type: 'number'})
  price: number;

  @ApiProperty({type: 'number'})
  @IsInt()
  quantity: number;

  @ApiProperty({type: 'string', enum: ['success', 'failed']})
  @IsIn(['success', 'failed'])
  status: 'success' | 'failed';

  @ApiProperty({ type: 'string'})
  @IsOptional()
  @IsString()
  failureReason?: string;

  @ApiProperty({ type: 'string', format: 'date-time'})
  createdAt: Date;
}
