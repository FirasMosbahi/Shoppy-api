import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { DeleteProductFromCartDto } from './dto/delete-product-from-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.create(createCartDto);
  }

  @Get()
  async findAll() {
    return await this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartService.findOne(id);
  }
  @Get('/byOwner/:id')
  async findOneById(@Param('id') id: string) {
    return await this.cartService.findCartByOwnerId(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartService.remove(id);
  }

  @Post('/addProductToCart')
  async addProductToCart(@Body() addProductToCartDto: AddProductToCartDto) {
    return await this.cartService.addProductToCart(addProductToCartDto);
  }

  @Delete('/deleteProductFromCart')
  async deleteProductFromCart(
    @Body() deleteProductFromCartDto: DeleteProductFromCartDto,
  ) {
    return this.cartService.deleteProductFromCart(deleteProductFromCartDto);
  }
}
