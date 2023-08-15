import { Module } from '@nestjs/common';
import { ShippingInfoService } from './shipping-info.service';
import { ShippingInfoController } from './shipping-info.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingInfo } from '../../entities/shipping_info.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ShippingInfo])
  ],
  controllers: [ShippingInfoController],
  providers: [ShippingInfoService]
})
export class ShippingInfoModule {}
