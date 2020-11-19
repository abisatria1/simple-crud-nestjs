import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/model/create-user.dto';
import { Repository, UpdateResult, WhereExpression } from 'typeorm';
import { User } from '../../entity/user.entity';
import { UserServiceContract } from '../user-contract';

@Injectable()
export class UserService implements UserServiceContract {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(param: {}): Promise<User> {
    return this.usersRepository.findOneOrFail(param);
  }

  update(id: number, data: CreateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, data);
  }

  delete(id: number) {
    return this.usersRepository.delete({ id });
  }
}
