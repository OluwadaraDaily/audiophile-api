import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../services/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from '../../entities/user_token.entity';
import { IsNull, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email)
    const validatePassword = await this.userService.validatePassword(password, user.password)
    if(!validatePassword) {
      throw new HttpException("Password is invalid", 401)
    }
    if (!user.is_active) {
      throw new HttpException("Check your email to activate your account", 403)
    }
    const { password: userPassword, ...userDetails } = user
    return userDetails
  }

  async signUpUser(userData: CreateUserDto): Promise<any> {
    //  - Create user [User service]
    const user = await this.userService.create(userData)
    if (user) {
      return user;
    }
  }

  async activateUser(userId: string, token: string) {
    try {
      
      const user = await this.userService.findOne(userId)
  
      // Check if token exists for that user on the user_tokens table
      const userToken = await this.userTokenRepository.findOne({
        where: { user: { id: userId }, deleted_at: IsNull() }
      })
  
      if (!userToken) {
        throw new HttpException(`Token not found`, 404)
      }
  
      // If so, update user_token record and update user is_active record
      userToken.deleted_at = new Date()
      user.is_active = true
  
      await this.userTokenRepository.save(userToken)
      await this.userRepository.save(user)
  
  
      return { message: 'User activated successfully' };
    } catch (error) {
      return error
    }
  }

  async loginUser(user: any) {
    const payload = {
      name: user.email,
      sub: user.id
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
