import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/model/create-user.dto';
import { LoginDto } from './model/login.dto';
import { AuthService } from './service/impl/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
