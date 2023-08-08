import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDto) {
    console.log('Data ->', data)
    // Sign up user
    //  - Create user [User service]
    //  - Authenticate user [Login, essentially]
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() request) {
    console.log('Request ->', request)
  }
}

