import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { CartProduct } from '../../entities/cart_product.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([CartProduct]),
    UsersModule,
    ProductsModule
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService]
})
export class CartsModule {}
