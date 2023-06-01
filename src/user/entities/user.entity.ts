import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  mail: string;
  @Column()
  password: string;
  @OneToOne((type) => Cart)
  @JoinColumn()
  cart: Cart | null;
  @OneToMany((type) => Review, (review: Review) => review.owner, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reviews: Review[] | null;
}
