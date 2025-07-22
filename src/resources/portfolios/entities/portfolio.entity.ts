import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '@app/resources/users/entities/user.entity';
import { Stock } from '@app/resources/stocks/entities/stock.entity';

@Entity('portfolios')
@Unique(['user', 'stock'])
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.portfolios, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Stock, (stock) => stock.portfolios, {
    eager: true,
    onDelete: 'CASCADE',
  })
  stock: Stock;

  @Column('int')
  quantity: number;
}
