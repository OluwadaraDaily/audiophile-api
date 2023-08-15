import { Test, TestingModule } from '@nestjs/testing';
import { ShippingInfoController } from './shipping-info.controller';
import { ShippingInfoService } from './shipping-info.service';

describe('ShippingInfoController', () => {
  let controller: ShippingInfoController;
  let shippingInfoService: ShippingInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShippingInfoController],
      providers: [
        {
          provide: ShippingInfoService,
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

    controller = module.get<ShippingInfoController>(ShippingInfoController);
    shippingInfoService = module.get<ShippingInfoService>(ShippingInfoService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
