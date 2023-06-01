import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { CartProduct } from './entities/cart-product.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product, CartProduct, User])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
