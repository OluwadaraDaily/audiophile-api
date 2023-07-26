import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string()
      //     .valid('development', 'test', 'production')
      //     .default('development'),
      //   PORT: Joi.number().default(3000),
      // }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
