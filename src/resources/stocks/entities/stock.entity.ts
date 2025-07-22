import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Portfolio } from '@app/resources/portfolios/entities/portfolio.entity';
import { Transaction } from '@app/resources/transactions/entities/transaction.entity';

@Entity('stocks')
export class Stock {
  @PrimaryColumn()
  symbol: string;

  @Column({ nullable: true })
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  currentPrice: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.stock)
  portfolios: Portfolio[];

  @OneToMany(() => Transaction, (transaction) => transaction.stock)
  transactions: Transaction[];
}
