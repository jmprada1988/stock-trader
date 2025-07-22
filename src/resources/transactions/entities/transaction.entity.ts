import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Stock } from '@app/resources/stocks/entities/stock.entity';
import { User } from '@app/resources/users/entities/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Stock, (stock) => stock.transactions, { eager: true })
  stock: Stock;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column({ type: 'varchar' })
  status: 'success' | 'failed';

  @Column({ type: 'text', nullable: true })
  failureReason?: string;

  @CreateDateColumn()
  createdAt: Date;
}
