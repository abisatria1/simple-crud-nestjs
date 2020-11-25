import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/model/create-user.dto';
import { LoginResponseDto } from '../model/login-response.dto';

export interface AuthContract {
  login(email: string, password: string): Promise<LoginResponseDto>;
  register(data: CreateUserDto): Promise<User>;
  signToken(user: User): { accessToken: any };
}
