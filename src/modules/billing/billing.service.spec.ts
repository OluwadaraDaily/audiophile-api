import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillingDetail } from '../../entities/billing_details.entity';
import { Repository } from 'typeorm';

describe('BillingService', () => {
  let service: BillingService;
  let usersService: UsersService;
  let billingDetailRepo: Repository<BillingDetail>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(BillingDetail),
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

    service = module.get<BillingService>(BillingService);
    usersService = module.get<UsersService>(UsersService);
    billingDetailRepo = module.get<Repository<BillingDetail>>(getRepositoryToken(BillingDetail))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
