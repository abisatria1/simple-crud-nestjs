import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/impl/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule, UserService],
})
export class UserModule {}
