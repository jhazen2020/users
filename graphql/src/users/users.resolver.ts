import {
    UseGuards,
    Injectable
} from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/authorization/gqlAuthGuard';
import { UsersInput, UsersList, UsersReturn, Users, UsersUpdateInput } from './users.model';
import { UsersService } from './users.service';
import { CurrentUser } from './user.decorator.graphql';


@Resolver()
@Injectable()
export class UsersResolver {
    constructor(
        private usersService: UsersService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [UsersReturn], { description: 'Get a list of users with a limit. Limit defaults to 10 if none is provided.', nullable: true})
    async getAllUsers(@Args('input', { type: () => UsersList }) input: UsersList, @CurrentUser() user: any) {
        const test = await this.usersService.getUsers(input.limit, input.cursor, input.order);
        console.log(user);
        return test;
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => UsersReturn,  {description: 'Get user data by ID.', nullable: true})
    async getUser(@Args('id', { type: () => Int }) id: number, @CurrentUser() user: any) {
        console.log(user);
        return this.usersService.getUser(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(()=>Boolean)
    async updateUser(@Args('input', { type: () => UsersUpdateInput }) input: UsersUpdateInput){
        this.usersService.updateUser(input);
        return true;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(()=>UsersReturn)
    async addUser(@Args('input', { type: () => UsersInput }) input: UsersInput){
        return this.usersService.addUser(input);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(()=>Boolean)
    async deleteUser(@Args('id', { type: () => Int }) id: number){
        this.usersService.deleteUser(id);
        return true;
    }
}