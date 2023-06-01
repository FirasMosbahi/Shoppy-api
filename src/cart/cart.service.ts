import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { CartProduct } from './entities/cart-product.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const owner = await this.userRepository.findOne({
      where: { id: createCartDto.ownerId },
    });
    const cart = new Cart();
    cart.owner = owner;
    cart.products = [];
    return await this.cartRepository.save(cart);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
  //   const cart = await this.findOne(id);
  //   Object.assign(cart, updateCartDto);
  //   return this.cartRepository.save(cart);
  // }

  async remove(id: string): Promise<void> {
    const cart = await this.findOne(id);
    await this.cartRepository.remove(cart);
  }

  async findCartByOwnerId(ownerId: string): Promise<Cart> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    const cart = await this.cartRepository.findOne({ where: { owner } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addProductToCart(
    ownerId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.findCartByOwnerId(ownerId);
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cartProduct = new CartProduct();
    cartProduct.quantity = quantity;
    cartProduct.cart = cart;
    cartProduct.product = product;

    await this.cartProductRepository.save(cartProduct);

    return this.findCartByOwnerId(ownerId);
  }
  async deleteProductFromCart(
    ownerId: string,
    cartProductId: string,
  ): Promise<Cart> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: { id: cartProductId },
    });
    await this.cartProductRepository.delete(cartProduct);
    return this.findCartByOwnerId(ownerId);
  }
}
