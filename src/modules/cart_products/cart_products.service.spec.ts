import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsService } from './cart_products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProduct } from '../../entities/cart_product.entity';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';

describe('CartProductsService', () => {
  let service: CartProductsService;
  let cartProductsRepository: Repository<CartProduct>;
  let productService: ProductsService;
  let cartsService: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductsService,
        {
          provide: getRepositoryToken(CartProduct),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn()
          },
        },
        {
          provide: CartsService,
          useValue: {
            findOne: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<CartProductsService>(CartProductsService);
    cartProductsRepository = module.get<Repository<CartProduct>>(getRepositoryToken(CartProduct))
    productService = module.get<ProductsService>(ProductsService)
    cartsService = module.get<CartsService>(CartsService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
