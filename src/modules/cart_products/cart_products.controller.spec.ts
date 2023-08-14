import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsController } from './cart_products.controller';

describe('CartProductsController', () => {
  let controller: CartProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartProductsController],
    }).compile();

    controller = module.get<CartProductsController>(CartProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
