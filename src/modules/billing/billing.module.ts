import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingDetail } from 'src/entities/billing_details.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([BillingDetail])
  ],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule {}
