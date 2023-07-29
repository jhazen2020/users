import { Inject, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ExceptionHandler } from 'lib/exception-handler';

@Injectable()
export class FakeUsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(ExceptionHandler)
    private exceptionHandler: ExceptionHandler,
  ) {}
  private async getFakeUsersAscendingOrder(
    startingIndex: number,
    endIndex: number
  ): Promise<Map<number,  Users>> {
    type userType = Map<number, Users>
    let users: userType = new Map();
    for (let i = startingIndex; i <= endIndex; i++) {
        const user = (await this.cacheManager.get('fake_user_id-' + i)) as string;
        users.set(i,JSON.parse(user))
    }
    return users;
  }
  private async getFakeUsersDescendingOrder(
    startingIndex: number,
    endIndex: number,
  ): Promise<Map<number, Users>> {
   type userType = Map<number, Users>
    let users: userType = new Map();
    for (let i = startingIndex; i >= endIndex; i--) {
      const user = (await this.cacheManager.get('fake_user_id-' + i)) as string;
      users.set(i,JSON.parse(user))
    }
    if(typeof users === 'undefined') throw new Error('No cache Data.');
    return users;
  }
  private setCurrentUserInFakeUsersList(
    usersList: Map<number, any>,
    currentUser: Record<string, any>,
  ) {
    const currentUserId = currentUser['id'];
    if (usersList.get(currentUserId)) {
        delete currentUser.usersCategories;
      usersList.set(currentUserId, currentUser);
    }
    
    return usersList;
  }
  private getStartingIndex(page: number, pageSize: number) {
    if (page < 1) {
      throw new Error('page must be above zero');
    }
    return (page - 1) * pageSize + 1;
  }
  private getEndIndex(page: number, pageSize: number, count: number) {
    const total = page * pageSize;
    return total > count ? count : page * pageSize;
  }
  private getStartingIndexDesc(page: number, pageSize: number, count: number) {
    if (page < 1) {
      throw new Error('page must be above zero');
    }
    const pages = Math.ceil(count / pageSize);
    const diff = (pages * pageSize) - count;
    const inversePage = (pages + 1) - page
    if(page === pages){
        return count % pageSize;
    }
    return inversePage * pageSize > count ? count : inversePage * pageSize - diff;
  }
  private getEndIndexDesc(page: number, pageSize: number, count: number) {
    const pages = Math.ceil(count / pageSize);
    if(page === pages){
        return 1;
    }
    return (count - (page * pageSize))  + 1;
  }
  private validatePage(page: number, pageSize: number, count: number) {
    if (page < 1) {
      throw new Error('page must be above zero');
    }

    if (Math.ceil(count / pageSize) < page) {
      throw new Error('page must be below total count divided by page size');
    }
    return true;
  }
  async getFakeUsersWithCurrentUser(
    page: number,
    pageSize: number,
    count: number,
    order: 'asc' | 'desc' | 'ASC' | 'DESC',
    currentUser: Record<string, any>,
  ) {
    try{
      let usersList;
      if (currentUser === null) throw new Error('no user found');
      this.validatePage(page, pageSize, count);
  
      if (order === 'asc' || order === 'ASC') {
        const startingIndex = this.getStartingIndex(page, pageSize);
        const endIndex = this.getEndIndex(page, pageSize, count);
        
        usersList = await this.getFakeUsersAscendingOrder(
          startingIndex,
          endIndex
        );
      } else {
        const startIndex = this.getStartingIndexDesc(page, pageSize, count);
        const endIndex = this.getEndIndexDesc(page, pageSize, count);
        usersList = await this.getFakeUsersDescendingOrder(startIndex, endIndex);
      }
      return this.setCurrentUserInFakeUsersList(usersList, currentUser);
    }catch(e){
      this.exceptionHandler.graphqlErrorHandler('Unable to get the modified users list.', e);
    }
    
  }
}
