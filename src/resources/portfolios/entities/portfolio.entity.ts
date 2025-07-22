import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '@app/resources/users/entities/user.entity';
@Entity('portfolios')
@Unique(['user', 'stock'])
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.portfolios, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  stock: string;

  @Column('int')
  quantity: number;
}
