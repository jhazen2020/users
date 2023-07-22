import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { FakeUsersService } from './fake-users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { ExceptionHandler } from 'lib/exception-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersResolver, ExceptionHandler, FakeUsersService],
})
export class UsersModule {}
