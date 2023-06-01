import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;
}
