import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { Repository } from 'typeorm';

describe('CartsService', () => {
  let service: CartsService;
  let cartRepository: Repository<Cart>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart))
    usersService = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
