import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartProduct } from '../../cart/entities/cart-product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  photo: string;
  @OneToMany(
    (type) => CartProduct,
    (cartProduct: CartProduct) => cartProduct.product,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  carts: CartProduct[] | null;
  static createProductFromDto = (
    createProductDto: CreateProductDto,
  ): Product => {
    const product: Product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.quantity = createProductDto.quantity;
    product.photo = createProductDto.photo;
    product.carts = [];
    return product;
  };
}
