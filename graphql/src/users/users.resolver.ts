import {
    UseGuards,
    Injectable
} from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/authorization/gqlAuthGuard';

@Resolver()
@Injectable()
export class UsersResolver {
    constructor() {}


    @Query(returns => Int, { description: 'Get all users with a limit. Limit defaults to 10.', nullable: true})
    async getAllUsers(@Args('limit', { type: () => Int }) limit: number[]) {
        return limit;
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => String,  {description: 'Get user by id.', nullable: true})
    async getUser(@Args('id', { type: () => Int }) id: number[]) {
        return id;
    }

    // @UseGuards(GqlAuthGuard)
    // @Mutation()
    // async deleteUser(@Args('input') input: String): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         return 'hello world'
    //     });
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Mutation()
    // async update(@Args('input') input: String): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         return 'hello world'
    //     });
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Mutation(returns => String)
    // async deleteUser(@Args('id') id: number): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         return 'hello world'
    //     });
    // }
}