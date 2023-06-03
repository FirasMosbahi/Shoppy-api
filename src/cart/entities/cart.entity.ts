import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CartProduct } from './cart-product.entity';
@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne((type) => User, { cascade: true })
  @JoinColumn({ name: 'ownerId', referencedColumnName: 'id' })
  owner: User;
  @ManyToMany((type) => CartProduct, { cascade: true })
  @JoinTable({
    name: 'carts-products',
    joinColumn: {
      name: 'cartId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cartProductId',
      referencedColumnName: 'id',
    },
  })
  products: CartProduct[] | null;
}
