import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Cart } from './cart/entities/cart.entity';
import { CartProduct } from './cart/entities/cart-product.entity';
import { Review } from './reviews/entities/review.entity';
import { Product } from './product/entities/product.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'shoppy',
      entities: [Cart, CartProduct, Review, Product, User],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
    CartModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
