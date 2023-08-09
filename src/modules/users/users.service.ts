import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async create(payload: CreateUserDto): Promise<User> {
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

    return newUser;
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
}
