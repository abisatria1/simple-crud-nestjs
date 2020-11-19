import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './service/impl/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAllUser() {
    return this.userService.findAll();
  }

  @Get('my/:id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({ id });
  }
}
