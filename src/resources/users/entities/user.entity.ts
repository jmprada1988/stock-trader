import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: 'string', format: 'uuid'})
  id: string;


  @Column({ unique: true })
  @ApiProperty({ type: 'string', format: 'email'})
  email: string;

  @ApiProperty({ type: 'string', format: 'date-time'})
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time'})
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
