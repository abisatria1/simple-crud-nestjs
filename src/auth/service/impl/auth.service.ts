import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/model/create-user.dto';
import { UserService } from '../../../user/service/impl/user.service';
import { AuthContract } from '../auth-contract';

@Injectable()
export class AuthService implements AuthContract {
  constructor(private userService: UserService) {}

  async login(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    if (!user)
      throw new HttpException('Email not valid', HttpStatus.UNAUTHORIZED);
    console.log(password, user.password);
    if (compareSync(password, user.password)) {
      return 'login';
    } else {
      throw new HttpException('Password not valid', HttpStatus.UNAUTHORIZED);
    }
  }

  async register(data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }
}
