import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioDto {
  @ApiProperty({ type: 'string', format: 'uuid'})
  @IsString()
  @IsOptional({groups: ['UPDATE']})
  user: string;

  @ApiProperty({ type: 'string'})
  @IsString()
  @IsOptional({groups: ['UPDATE']})
  stock: string;

  @ApiProperty({ type: 'number'})
  @IsInt()
  quantity: number;
}
