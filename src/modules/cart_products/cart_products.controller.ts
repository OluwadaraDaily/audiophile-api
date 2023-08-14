import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartProductsService } from './cart_products.service';
import { CreateCartProductDto } from './dto/create-cart-products.dto';

@Controller('cart-products')
export class CartProductsController {
  constructor(
    private readonly cartProductsService: CartProductsService
  ) {}
  @Post(":cart_id/:product_id")
  async create(@Param("cart_id") cartId: string, @Param("product_id") productId: string, payload: CreateCartProductDto) {
    return await this.cartProductsService.create(cartId, productId, payload )
  }

  @Get(":cart_id/:product_id")
  async findOne(@Param("cart_id") cartId: string, @Param("product_id") productId: string) {
    return await this.cartProductsService.findOne(cartId, productId)
  }

  @Patch(":cart_id/:product_id")
  async update(@Param("cart_id") cartId: string, @Param("product_id") productId: string, payload: CreateCartProductDto) {
    return await this.cartProductsService.update(cartId, productId, payload )
  }

  @Delete(":cart_id/:product_id")
  async delete(@Param("cart_id") cartId: string, @Param("product_id") productId: string) {
    return await this.cartProductsService.delete(cartId, productId)
  }
}
