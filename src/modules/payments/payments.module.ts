import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentProvider } from 'src/entities/payment_provider.entity';
import { PaymentMethod } from 'src/entities/payment_method.entity';
import { PaymentTransaction } from 'src/entities/payment_transaction.entity';
import { PaymentsProviderService } from './payments-providers.service';
import { PaymentsTransactionService } from './payments-transactions.service';
import { PaymentsMethodService } from './payments-methods.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentProvider, PaymentMethod, PaymentTransaction]),
    UsersModule
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsProviderService,
    PaymentsTransactionService,
    PaymentsMethodService
  ]
})
export class PaymentsModule {}
