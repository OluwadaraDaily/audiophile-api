import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInfoService } from './shipping-info.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { ShippingInfo } from '../../entities/shipping_info.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ShippingInfoService', () => {
  let service: ShippingInfoService;
  let usersService: UsersService;
  let shippingInfoRepo: Repository<ShippingInfo>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShippingInfoService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(ShippingInfo),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
            delete: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<ShippingInfoService>(ShippingInfoService);
    usersService = module.get<UsersService>(UsersService)
    shippingInfoRepo = module.get<Repository<ShippingInfo>>(getRepositoryToken(ShippingInfo))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
