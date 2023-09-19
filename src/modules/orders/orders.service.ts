import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { IsNull, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private usersService: UsersService,
    private cartsService: CartsService
  ) { }
  
  async create(payload: CreateOrderDto) {
    const { cart_id, user_id } = payload

    let order = await this.orderRepository.findOne({
      where: { cart: { id: cart_id }, user: { id: user_id }, deleted_at: IsNull() }
    });

    if (order) {
      throw new HttpException(`Order with ID ${order.id} already exists`, HttpStatus.CONFLICT)
    }
    
    order = await this.orderRepository.create({
      ...payload,
      deleted_at: null
    })
    await this.orderRepository.save(order)

    return order;
  }

  async findAll() {
    const allOrders = await this.orderRepository.find({
      where: { deleted_at: IsNull() }
    });
    return allOrders;
  }

  async findAllOrdersforUser(userId: string) {
    const user = await this.usersService.findOne(userId)
    const allOrdersforUser = await this.orderRepository.find({
      where: { user: { id: userId }, deleted_at: IsNull() }
    })

    return allOrdersforUser;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id, deleted_at: IsNull() }
    })
    if (!order) {
      throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return order;
  }

  async findOneByUserIdAndCartId(userId: string, cartId: string) {
    const user = await this.usersService.findOne(userId)
    const cart = await this.cartsService.findOne(cartId)

    let order = await this.orderRepository.findOne({
      where: { cart: { id: cartId }, user: { id: userId }, deleted_at: IsNull() }
    });
    
    if (!order) {
      throw new HttpException(`Order of user with ID ${userId} in cart ${cartId} not found`, HttpStatus.NOT_FOUND)
    }

    return order;
  }

  async update(id: string, payload: UpdateOrderDto) {
    const { user_id, cart_id } = payload;

    let order = await this.findOneByUserIdAndCartId(user_id, cart_id)

    if (order.id !== id) {
      throw new HttpException(`Order retreived with ID ${order.id} is not the same as ID ${id} passed in`, HttpStatus.AMBIGUOUS)
    }

    const updatedOrder = {
      ...order,
      ...payload,
      deleted_at: null
    }

    await this.orderRepository.save(updatedOrder)
    return updatedOrder;

  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepository.delete(order.id)
    return { message: "Order deleted successfully" };
  }
}
