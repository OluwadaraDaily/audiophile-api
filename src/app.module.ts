import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm/typeorm.service';
import { CartsModule } from './modules/carts/carts.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './services/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CartProductsModule } from './modules/cart_products/cart_products.module';
import { BillingModule } from './modules/billing/billing.module';
import { ShippingInfoModule } from './modules/shipping-info/shipping-info.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MailerModule.forRoot({
      transport: `smtps://${process.env.GOOGLE_EMAIL}:${process.env.GOOGLE_PASSWORD}@gmail.com`,
      template: {
        dir: process.cwd() + '/src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CartsModule,
    ProductsModule,
    CategoriesModule,
    UsersModule,
    PaymentsModule,
    AuthModule,
    MailModule,
    CartProductsModule,
    BillingModule,
    ShippingInfoModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
