import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
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

  @Get("activate/:userId/:token")
  async activateUser(@Param('userId') userId: string, @Param('token') token: string) {
    return await this.authService.activateUser(userId, token)
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() request) {
    return await this.authService.loginUser(request.user)
  }
}

