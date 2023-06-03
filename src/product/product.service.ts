import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import { convertImageToBase64 } from '../utilities/base64-convertor';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    const photoConvertedProducts = products.map((p) => {
      const decodedPhoto = convertImageToBase64(p.photo);
      return { ...p, photo: decodedPhoto };
    });
    return photoConvertedProducts;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    const productEncodedImage = convertImageToBase64(product.photo);
    return { ...product, photo: productEncodedImage };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto);
    const product = Product.createProductFromDto(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productRepository.update({ id }, { ...updateProductDto });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
