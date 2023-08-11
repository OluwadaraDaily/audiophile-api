import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
  let service: MailService;
  let configService: ConfigService
  let mailerService: MailerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            addTransporter: jest.fn(),
            sendMail: jest.fn(),
          }
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService)
    configService = module.get<ConfigService>(ConfigService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
