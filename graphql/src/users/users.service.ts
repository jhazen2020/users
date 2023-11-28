import { Inject, Injectable } from '@nestjs/common';
import { Users as UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { ExceptionHandler } from 'lib/exception-handler';
import { instanceToPlain } from 'class-transformer';
import { Users } from './users.type';

/**
 * Manages basic functionality of the RDS data source for users. 
 * @date 7/31/2023 - 12:42:13 PM
 * @todo add return types.
 * @export
 * @class UsersService
 * @typedef {UsersService}
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @Inject(ExceptionHandler)
    private exceptionHandler: ExceptionHandler,
  ) {}
  async addUser(user: Users) {
    try {
      return await this.usersRepository.insert(user);
    } catch (e) {
      this.exceptionHandler.graphqlErrorHandler('Unable to add user', e);
    }
  }
  async updateUser(user: Users) {
    try {
      return await this.usersRepository.update({ email: user.email }, user);
    } catch (e) {
      this.exceptionHandler.graphqlErrorHandler('Unable to update user', e);
    }
  }
  async getUsers(
    limit: number = 10,
    cursor: number | undefined = 0,
    order: 'desc' | 'asc' | 'DESC' | 'ASC' = 'DESC',
  ) {
    try {
      return await this.usersRepository.find({
        relations: ['usersCategories'],
        where: {
          id: MoreThanOrEqual(cursor),
        },
        take: limit,
        order: {
          id: {
            direction: order,
          },
        },
      });
    } catch (e) {
      this.exceptionHandler.graphqlErrorHandler('Unable to get users list.', e);
    }
  }
  async getCountUsers() {
    try {
      return await this.usersRepository.count();
    } catch (e) {
      this.exceptionHandler.graphqlErrorHandler(
        'Unable to get users count.',
        e,
      );
    }
  }
  async getUser(email: string) {
    try {
      const data = await this.usersRepository.findOne({
        relations: ['usersCategories'],
        where: {
          email,
        },
      });
      if (!data) {
        return data;
      }
      return instanceToPlain(data);
    } catch (e) {
      this.exceptionHandler.graphqlErrorHandler('Unable to get user.', e);
    }
  }
  async deleteUser(id: number) {
    try {
      return await this.usersRepository.delete(id);
    } catch (e) {
      this.exceptionHandler.graphqlErrorHandler(
        'Unable to delete the user.',
        e,
      );
    }
  }
}
