import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { IsNull, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartProduct } from 'src/entities/cart_product.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
    private usersService: UsersService,
    private productsService: ProductsService
  ){}
  async create(payload: CreateCartDto): Promise<Cart> {
    const { user_id: userId } = payload
    const activeCart = await this.cartRepository.findOne({
      where: { user: { id: userId }, is_active: true, deleted_at: IsNull() }
    })
    if (activeCart) {
      throw new HttpException("You have an active cart", HttpStatus.CONFLICT)
    }
    const cart = await this.cartRepository.create({
      ...payload,
      deleted_at: null
    })

    await this.cartRepository.save(cart)

    return cart;
  }

  async findAll(isActive: string | undefined): Promise<Cart[]> {
    let carts;
    if (isActive === 'true') {
      carts = await this.cartRepository.find({
        where: { is_active: true, deleted_at: IsNull() }
      })
    } else {
      carts = await this.cartRepository.find({
        where: { deleted_at: IsNull() }
      })
    }
    return carts;
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id, is_active: true, deleted_at: IsNull() }
    })
    if (!cart) {
      throw new HttpException(`Cart with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return cart;
  }

  async findOneByUserId(userId: string): Promise<Cart> {
    const user = await this.usersService.findOne(userId)
    const cart = await this.cartRepository.findOne({
      where: { user: { id: user.id }, is_active: true, deleted_at: IsNull() }
    })
    return cart;
  }

  async update(id: string, payload: UpdateCartDto) {
    const cart = await this.findOne(id)
    const updatedCart = {
      ...payload,
      deleted_at: null
    }
    await this.cartRepository.save(updatedCart)

    return updatedCart;
  }

  async remove(id: string): Promise<any> {
    const cart = await this.findOne(id)
    await this.cartRepository.delete(cart.id)
    return { message: "Cart deleted successfully" };
  }
}
