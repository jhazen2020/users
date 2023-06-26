import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './users/users.resolver';
import { GqlAuthGuard } from './authorization/gqlAuthGuard';

@Module({
  imports: [
    AuthorizationModule, 
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver, GqlAuthGuard],
})
export class AppModule {}
