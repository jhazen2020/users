import { UseGuards, Injectable } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json'
import { GqlAuthGuard } from 'src/authorization/gqlAuthGuard';
import {
  UsersInput,
  UsersListInput,
  UsersReturn,
  UsersUpdateInput,
} from './users.model';
import { UsersService } from './users.service';
import { FakeUsersService } from './fake-users.service';
import { CurrentUser } from './user.decorator.graphql';
import { Users } from './users.entity';

@Resolver()
@Injectable()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private readonly fakeUsersService: FakeUsersService,
  ) {}
  private emailMetaDataIndexName = `https://${process.env.AUTH0_AUDIENCE}/email`;
  @UseGuards(GqlAuthGuard)
  @Query(()=>GraphQLJSON, {
    description:
      'Get a list of users with a limit. Limit defaults to 10 if none is provided. All users will show as fake information unless it is the logged in user.',
    nullable: true,
  })
  async getAllUsers(
    @Args('input', { type: () => UsersListInput }) input: UsersListInput,
    @CurrentUser() user: any,
  ): Promise<Users[] | []> {
    let usersList: Users[]= [];
    const email = user[this.emailMetaDataIndexName];
    const currentUserPromise = await this.usersService.getUser(email);
    const countUsersPromise = await this.usersService.getCountUsers();
    const [currentUser, usersTotalCount] = await Promise.all([
      currentUserPromise,
      countUsersPromise,
    ]);
    if (!currentUser || !email || !usersTotalCount) {
      return [];
    }
    
    const usersListMap = await this.fakeUsersService.getFakeUsersWithCurrentUser(
      input.page,
      input.limit,
      usersTotalCount,
      input.order,
      currentUser,
    );
    if(usersListMap === undefined){
      return usersList;
    }
    for(let user of  usersListMap.values()){
      usersList.push(user)
    }
    return usersList;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UsersReturn, {
    description: 'Get user data by email.',
    nullable: true,
  })
  async getUser(
    @Args('email', { type: () => String }) email: string,
    @CurrentUser() user: any,
  ) {
    return user[this.emailMetaDataIndexName] === email
      ? this.usersService.getUser(email)
      : null;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Int, {
    description: 'Get total users count.'
  })
  async getUsersCount() {
    return await this.usersService.getCountUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async updateUser(
    @Args('input', { type: () => UsersUpdateInput }) input: UsersUpdateInput,
    @CurrentUser() user: any,
  ) {
    console.log(user);
    if(user[this.emailMetaDataIndexName] === input.email){
      this.usersService.updateUser(input);
      return true;
    }
    return false;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async addUser(@Args('input', { type: () => UsersInput }) input: UsersInput) {
    this.usersService.addUser(input);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    this.usersService.deleteUser(id);
    return true;
  }
}
