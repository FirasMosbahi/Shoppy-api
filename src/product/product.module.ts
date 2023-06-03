import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadMiddleware } from '../middlewares/file-upload-middleware';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './images', // Destination directory for uploaded files
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FileUploadMiddleware)
      .forRoutes({ path: '/product', method: RequestMethod.POST });
  }
}
