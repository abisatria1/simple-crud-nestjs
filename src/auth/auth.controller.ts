import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/model/create-user.dto';
import { LoginDto } from './model/login.dto';
import { AuthService } from './service/impl/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
