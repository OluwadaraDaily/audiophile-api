import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserToken } from '../../entities/user_token.entity';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../../services/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>,
    private mailService: MailService
  ) {}
  async create(payload: CreateUserDto): Promise<User> {
    try {
      // Check if user already exists [email should be unique]
      const user = await this.userRepository.findOne({
        where: { email: payload.email, deleted_at: IsNull() }
      })
      if(user) {
        throw new HttpException('User with email already exists', 409)
      }
  
      // Encrypt password
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(payload.password, salt)
  
      const userPayload = {
        ...payload,
        password: hashedPassword
      }
  
      // Check for deleted user
      const deletedUser = await this.userRepository.findOne({
        where: { email: payload.email, deleted_at: Not(IsNull()) }
      });
  
      if(deletedUser) {
        await this.userRepository.update(
          { id: deletedUser.id },
          { ...userPayload, deleted_at: null }
        )
        return await this.userRepository.findOne({
          where: { email: payload.email, deleted_at: IsNull() },
        });
      }
      const newUser: User = await this.userRepository.create({
        ...userPayload,
        deleted_at: null
      })
  
      await this.userRepository.save(newUser)
  
      // Create token record on user_tokens table
      const token = uuidv4();
      const userTokenRecord: UserToken = await this.userTokenRepository.create({
        token,
        user: newUser,
        deleted_at: null
      })
  
      await this.userTokenRepository.save(userTokenRecord)
  
      // Send email to user
      const emailData = {
        recipient: newUser.email,
        subject: "Activate Your Audiophile Account",
        template_name: 'activate_account',
        data: {
          url: `${process.env.BASE_URL}/activate/${newUser.id}/${token}`
        }
      }
      await this.mailService.sendMail(emailData)
  
      return newUser;
    } catch (error) {
      return error
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { deleted_at: IsNull() }
    })
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id, deleted_at: IsNull() }
    })

    if(!user) {
      throw new HttpException(`User with ID ${id} does not exist`, 404)
    }
    return user;
  }

  async findOneUserToken(token: string): Promise<UserToken> {
    const userToken: UserToken = await this.userTokenRepository.findOne({
      where: { token, deleted_at: IsNull() }
    })
    if (!userToken) {
      throw new HttpException(`Token not found`, 404)
    }
    return userToken;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email, deleted_at: IsNull() }
    })

    if(!user) {
      throw new HttpException(`User with Email ${email} does not exist`, 404)
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validatePassword(password: string, hashPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashPassword)
    return match;
  }

  async activateUser(id: string) {
    const user = await this.findOne(id)

    const userToken = await this.userTokenRepository.update(
      { user: user },
      { deleted_at: new Date() }
    )

    return userToken;
  }
}
