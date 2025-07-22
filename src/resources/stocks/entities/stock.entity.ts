import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional({ groups: ['UPDATE']})
  symbol: string;

  @Column({ nullable: true })
  @ApiProperty({ type: 'string'  })
  @IsString()
  @IsOptional()
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @ApiProperty({ type: 'number'})
  @IsNumber()
  @IsOptional({ groups: ['UPDATE']})
  currentPrice: number;

  @ApiProperty({ type: 'string', format: 'date-time'})
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.stock)
  portfolios: Portfolio[];

  @OneToMany(() => Transaction, (transaction) => transaction.stock)
  transactions: Transaction[];
}
