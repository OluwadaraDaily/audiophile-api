import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentMethod } from "src/entities/payment_method.entity";
import { IsNull, Repository } from "typeorm";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UsersService } from "../users/users.service";
import { PaymentsProviderService } from "./payments-providers.service";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";

@Injectable()
export class PaymentsMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentsMethodRepo: Repository<PaymentMethod>,
    private usersService: UsersService,
    private paymentProviderService: PaymentsProviderService
  ) { }

  async createPaymentMethod(payload: CreatePaymentMethodDto) {
    const { user_id, payment_provider_id } = payload
    const user = await this.usersService.findOne(user_id)
    const paymentProvider = await this.paymentProviderService.getPaymentProvider(payment_provider_id);
    let is_primary = true

    const allPaymentMethods = await this.fetchAllPaymentMethods(user_id)

    if(allPaymentMethods.length > 0) is_primary = false

    const newPaymentMethod = await this.paymentsMethodRepo.create({
      ...payload,
      is_primary,
      deleted_at: null
    })

    await this.paymentsMethodRepo.save(newPaymentMethod)

    return newPaymentMethod;
  }

  async fetchAllPaymentMethods(userId: string) {
    const user = this.usersService.findOne(userId)
    const paymentMethods = this.paymentsMethodRepo.find({
      where: { user: { id: userId }, deleted_at: IsNull() }
    })
    return paymentMethods;
  }

  async getPaymentMethod(id: string) {
    const paymentMethod = await this.paymentsMethodRepo.findOne({
      where: { id, deleted_at: IsNull() }
    })
    
    if (!paymentMethod) {
      throw new HttpException(`Payment method with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return paymentMethod;
  }

  async updatePaymentMethod(id: string, payload: UpdatePaymentMethodDto) {
    const paymentMethod = await this.getPaymentMethod(id)

    const updatedPaymentMethod = {
      ...paymentMethod,
      ...payload,
      deleted_at: null
    }

    await this.paymentsMethodRepo.save(updatedPaymentMethod);

    return updatedPaymentMethod;
  }

  async deletePaymentMethod(id: string) {
    const paymentMethod = await this.getPaymentMethod(id)
    await this.paymentsMethodRepo.delete(paymentMethod.id)
    return { message: "Payment method deleted successfully" };
  }
}