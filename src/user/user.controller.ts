import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from './entity/user.entity';
import { UserService } from './service/impl/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('my')
  getProfile(@Request() req) {
    const { id, name, email, isActive, notelp, description } = <User>req.user;
    return {
      id,
      name,
      email,
      isActive,
      notelp,
      description,
    };
  }
}
