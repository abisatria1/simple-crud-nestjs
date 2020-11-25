import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { LoginResponseDto } from 'src/auth/model/login-response.dto';
import { JwtPayload } from 'src/auth/model/jwt-payload';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/model/create-user.dto';
import { UserService } from '../../../user/service/impl/user.service';
import { AuthContract } from '../auth-contract';

@Injectable()
export class AuthService implements AuthContract {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOne({ email });

    if (!user) throw new HttpException('Email not valid', 401);
    if (!compareSync(password, user.password))
      throw new HttpException('Password not valid', 401);

    return this.signToken(user);
  }

  async register(data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  signToken(user: User): { accessToken: string } {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
