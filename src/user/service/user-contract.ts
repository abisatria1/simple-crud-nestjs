import { UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../model/create-user.dto';

export interface UserServiceContract {
  findAll(): Promise<User[]>;

  create(data: CreateUserDto): Promise<User>;

  findOne(columnName: any, value: any): Promise<User>;

  update(id: number, data: CreateUserDto): Promise<UpdateResult>;

  delete(id: number);
}
