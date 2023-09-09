import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePaymentProviderDto } from "./dto/create-payment-provider.dto";
import { IsNull, Repository } from "typeorm";
import { PaymentProvider } from "../../entities/payment_provider.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePaymentProviderDto } from "./dto/update-payment-provider.dto";

enum idType {
  SLUG = "slug",
  ID = "id"
} 

@Injectable()
export class PaymentsProviderService {
  constructor(
    @InjectRepository(PaymentProvider)
    private paymentsProviderRepo: Repository<PaymentProvider>
  ) { }
  
  async createPaymentProvider(payload: CreatePaymentProviderDto): Promise<PaymentProvider> {
    const { name, slug, type } = payload

    const existingPaymentProvider = await this.paymentsProviderRepo.findOne({
      where: { slug, type, deleted_at: IsNull() }
    })

    if (existingPaymentProvider) {
      throw new HttpException(`A Payment Provider with slug ${slug} of type [${type}] already exists`, HttpStatus.CONFLICT)
    }
    const newPaymentProvider = await this.paymentsProviderRepo.create({
      ...payload,
      deleted_at: null
    })

    await this.paymentsProviderRepo.save(newPaymentProvider)

    return newPaymentProvider;
  }

  async getPaymentProvider(id: string): Promise<PaymentProvider> {
    const paymentProvider = await this.paymentsProviderRepo.findOne({
      where: { id, deleted_at: IsNull() }
    })
    if (!paymentProvider) {
      throw new HttpException(`Payments Provider with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return paymentProvider;
  }

  async getPaymentProviderBySlug(slug: string): Promise<PaymentProvider> {
    const paymentProvider = await this.paymentsProviderRepo.findOne({
      where: { slug, deleted_at: IsNull() }
    })
    if (!paymentProvider) {
      throw new HttpException(`Payments Provider with slug ${slug} not found`, HttpStatus.NOT_FOUND)
    }

    return paymentProvider;
  }

  async fetchAllPaymentProviders(): Promise<PaymentProvider[]> {
    const paymentProviders = await this.paymentsProviderRepo.find({
      where: { deleted_at: IsNull() }
    })

    return paymentProviders;
  }

  async updatePaymentProvider(id: string, payload: UpdatePaymentProviderDto): Promise<PaymentProvider> {
    const paymentProvider = await this.getPaymentProvider(id)
    const updatedPaymentProvider = {
      ...paymentProvider,
      ...payload,
      deleted_at: null
    }

    await this.paymentsProviderRepo.save(updatedPaymentProvider)

    return updatedPaymentProvider;
  }

  async removePaymentProvider(id: string): Promise<any> {
    const paymentProvider = await this.getPaymentProvider(id)
    await this.paymentsProviderRepo.delete(paymentProvider.id)
    return { message: "Payment provider deleted successfully" };
  }
}