import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsController } from './cart_products.controller';
import { CartProductsService } from './cart_products.service';

describe('CartProductsController', () => {
  let controller: CartProductsController;
  let cartProductsService: CartProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartProductsController],
      providers: [
        {
          provide: CartProductsService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        }
      ]
    }).compile();

    controller = module.get<CartProductsController>(CartProductsController);
    cartProductsService = module.get<CartProductsService>(CartProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
