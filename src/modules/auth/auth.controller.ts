import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDto) {
    console.log('Data ->', data)
    const user = await this.authService.signUpUser(data)

    console.log('User ->', user)

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() request) {
    console.log('Request ->', request)
  }
}

