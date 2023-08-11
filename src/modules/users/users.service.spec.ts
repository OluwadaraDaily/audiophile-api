import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserToken } from '../../entities/user_token.entity';
import { MailService } from '../../services/mail/mail.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let userTokenRepository: Repository<UserToken>;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(UserToken),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          }
        },
        {
          provide: MailService,
          useValue: {
            sendMail: jest.fn()
          }
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    userTokenRepository = module.get<Repository<UserToken>>(getRepositoryToken(UserToken))
    mailService = module.get<MailService>(MailService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
