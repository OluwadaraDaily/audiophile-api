import { Module } from '@nestjs/common';
import { CartProductsController } from './cart_products.controller';
import { CartProductsService } from './cart_products.service';
import { CartsModule } from '../carts/carts.module';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { Product } from '../../entities/product.entity';
import { CartProduct } from '../../entities/cart_product.entity';

@Module({
  imports: [
    CartsModule,
    ProductsModule,
    TypeOrmModule.forFeature([Cart, Product, CartProduct])
  ],
  controllers: [CartProductsController],
  providers: [CartProductsService]
})
export class CartProductsModule {}
