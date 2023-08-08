import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email)
    const validatePassword = await this.userService.validatePassword(password, user.password)
    if(!validatePassword) {
      throw new HttpException("Password is invalid", 401)
    }
    const { password: userPassword, ...userDetails } = user
    return userDetails
  }

  async signUpUser(userData: CreateUserDto): Promise<any> {
    // Sign up user
    //  - Create user [User service]
    //  - Authenticate user [Login, essentially]
    const user = await this.userService.create(userData)
    if(user) {
      return user;
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
