import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShippingInfoDto } from './dto/create-shipping-info.dto';
import { UpdateShippingInfoDto } from './dto/update-shipping-info.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingInfo } from '../../entities/shipping_info.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ShippingInfoService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(ShippingInfo)
    private shippingInfoRepo: Repository<ShippingInfo>
  ) { }
  
  async create(payload: CreateShippingInfoDto): Promise<ShippingInfo> {
    const { user_id } = payload
    const user = await this.usersService.findOne(user_id)
    const shippingInfo = await this.shippingInfoRepo.create({
      ...payload,
      user: { id: user.id },
      deleted_at: null
    })
    await this.shippingInfoRepo.save(shippingInfo)

    return shippingInfo;
  }

  async findAll(): Promise<ShippingInfo[]> {
    const allShippingInformations = await this.shippingInfoRepo.find({
      where: { deleted_at: IsNull() }
    })

    return allShippingInformations;
  }

  async findAllforUser(userId: string): Promise<ShippingInfo[]> {
    const allShippingInformations = await this.shippingInfoRepo.find({
      where: { user: { id: userId }, deleted_at: IsNull() }
    })

    return allShippingInformations;
  }

  async findOne(id: string): Promise<ShippingInfo> {
    const shippingInfo = await this.shippingInfoRepo.findOne({
      where: { id, deleted_at: IsNull() }
    })
    if (!shippingInfo) {
      throw new HttpException(`Shipping Information with ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return shippingInfo;
  }

  async update(id: string, payload: UpdateShippingInfoDto) {
    const shippingInfo = await this.findOne(id)
    const updatedShippingInfo = {
      ...shippingInfo,
      ...payload,
      deleted_at: null
    }
    await this.shippingInfoRepo.save(updatedShippingInfo)

    return updatedShippingInfo;
  }

  async remove(id: string) {
    const shippingInfo = await this.findOne(id)
    await this.shippingInfoRepo.delete(shippingInfo.id)
    return { message: 'Shipping information deleted successfully' }
  }
}
