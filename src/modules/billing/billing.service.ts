import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingDetail } from '../../entities/billing_details.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class BillingService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(BillingDetail)
    private billingDetailRepository: Repository<BillingDetail>
  ) { }
  
  async create(payload: CreateBillingDto): Promise<BillingDetail> {
    const { user_id } = payload
    const user = await this.usersService.findOne(user_id)
    const billingDetail = await this.billingDetailRepository.findOne({
      where: { user: { id: user_id } }
    })

    if (billingDetail) {
      // Update existing record
      return this.update(billingDetail.id, payload)
    }
    const newBillingDetail = this.billingDetailRepository.create({
      ...payload,
      deleted_at: null
    })

    await this.billingDetailRepository.save(newBillingDetail)

    return newBillingDetail;
  }

  async findAll(): Promise<BillingDetail[]> {
    const billingDetails = await this.billingDetailRepository.find({
      where: { deleted_at: IsNull() }
    })

    return billingDetails;
  }

  async findOne(id: string): Promise<BillingDetail> {
    const billingDetail = await this.billingDetailRepository.findOne({
      where: { id }
    })

    if (!billingDetail) {
      throw new HttpException(`Billing Detail with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return billingDetail;
  }

  async update(id: string, payload: UpdateBillingDto): Promise<BillingDetail> {
    const { user_id } = payload
    const user = await this.usersService.findOne(user_id)
    const existingBillingDetail = await this.findOne(id)
    const updatedBillingDetail = {
      ...existingBillingDetail,
      ...payload,
      deleted_at: null
    }

    await this.billingDetailRepository.save(updatedBillingDetail)
    return updatedBillingDetail;
  }

  async remove(id: string): Promise<any> {
    const billingDetail = await this.findOne(id)
    await this.billingDetailRepository.delete(billingDetail.id)
    return { message: 'Billing detail deleted successfully' };
  }
}
