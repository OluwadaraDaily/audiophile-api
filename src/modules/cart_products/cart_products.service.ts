import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';
import { IsNull, Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { CartProduct } from '../../entities/cart_product.entity';
import { CreateCartProductDto } from './dto/create-cart-products.dto';
import { UpdateCartProductsDto } from './dto/update-cart-products.dto';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
    private cartService: CartsService,
    private productService: ProductsService
  ) { }
  
  async create(cartId: string, productId: string, payload: CreateCartProductDto): Promise<CartProduct> {
    const cartProduct = await this.findOne(cartId, productId)
    if (cartProduct) {
      // Update cart product with payload
      const updatedRecord = this.update(cartId, productId, payload)
      return updatedRecord;
    }
    const product = await this.productService.findOne(productId)
    const subTotal = product.unit_price * payload.quantity
    const newCartProduct = await this.cartProductRepository.create({
      ...payload,
      cart: { id: cartId },
      product: { id: productId },
      sub_total: subTotal,
      deleted_at: null
    })
    await this.cartProductRepository.save(newCartProduct)
    return newCartProduct;
  }

  async findOne(cartId: string, productId: string): Promise<CartProduct> {
    const cart = await this.cartService.findOne(cartId)
    const product = await this.productService.findOne(productId)
    const cartProduct = await this.cartProductRepository.findOne({
      where: { cart: { id: cartId }, product: { id: productId }, deleted_at: IsNull() }
    })
    if (!cartProduct) {
      throw new HttpException(`Cart Product not found`, HttpStatus.NOT_FOUND)
    }
    return cartProduct;
  }

  async update(cartId: string, productId: string, payload: UpdateCartProductsDto): Promise<CartProduct> {
    const { quantity } = payload
    const cartProduct = await this.findOne(cartId, productId)
    const product = await this.productService.findOne(productId)
    const newQuantity = cartProduct.quantity + quantity
    if (newQuantity > product.quantity) {
      throw new HttpException(`The Product [${product.name}] has ${product.quantity} units left`, HttpStatus.FORBIDDEN)
    }
    const newSubTotal = newQuantity * product.unit_price
    const updatedCartProduct = {
      ...cartProduct,
      quantity: newQuantity,
      sub_total: newSubTotal,
      deleted_at: null
    }
    await this.cartProductRepository.save(updatedCartProduct)

    return updatedCartProduct;
  }

  async delete(cartId: string, productId: string) {
    const cartProduct = await this.findOne(cartId, productId)
    await this.cartProductRepository.delete(cartProduct.id)
    return { message: "CartProduct deleted successfully" }
  }
}
