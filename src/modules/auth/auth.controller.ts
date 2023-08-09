import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDto) {
    return await this.authService.signUpUser(data)
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() request) {
    return await this.authService.loginUser(request.user)
  }
}

