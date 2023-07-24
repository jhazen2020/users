import { UseGuards, Injectable } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json'
import { GqlAuthGuard } from 'src/authorization/gqlAuthGuard';
import {
  UsersInput,
  UsersList,
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

  @UseGuards(GqlAuthGuard)
  @Query(()=>GraphQLJSON, {
    description:
      'Get a list of users with a limit. Limit defaults to 10 if none is provided. All users will show as fake information unless it is the logged in user.',
    nullable: true,
  })
  async getAllUsers(
    @Args('input', { type: () => UsersList }) input: UsersList,
    @CurrentUser() user: any,
  ): Promise<Users[] | []> {
    let users = [];
    const email = user['https://api.jessehazen.net/email'];
    const userDataPromise = await this.usersService.getUser(email);
    const countPromise = await this.usersService.getCountUsers();
    const [userData, count] = await Promise.all([
      userDataPromise,
      countPromise,
    ]);
    if (!userData || !email || !count) {
      return [];
    }
    
    const data = await this.fakeUsersService.getFakeUsersWithCurrentUser(
      input.page,
      input.limit,
      count,
      input.order,
      userData,
    );
    for(let value of  data.values()){
      users.push(value)
    }
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UsersReturn, {
    description: 'Get user data by ID.',
    nullable: true,
  })
  async getUser(
    @Args('email', { type: () => String }) email: string,
    @CurrentUser() user: any,
  ) {
    return user['https://api.jessehazen.net/email'] === email
      ? this.usersService.getUser(email)
      : null;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Int, {
    description: 'Get total users count'
  })
  async getUsersCount() {
    return await this.usersService.getCountUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async updateUser(
    @Args('input', { type: () => UsersUpdateInput }) input: UsersUpdateInput,
  ) {
    this.usersService.updateUser(input);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UsersReturn)
  async addUser(@Args('input', { type: () => UsersInput }) input: UsersInput) {
    return this.usersService.addUser(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    this.usersService.deleteUser(id);
    return true;
  }
}
