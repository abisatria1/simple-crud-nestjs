import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/model/create-user.dto';

export interface AuthContract {
  login(email: string, password: string);
  register(data: CreateUserDto): Promise<User>;
}
