import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlAuthGuard } from './authorization/gqlAuthGuard';

import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './../database/typeOrmConfig';

@Module({
  imports: [
    AuthorizationModule, 
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModule)
  ],
  controllers: [AppController],
  providers: [AppService, GqlAuthGuard],
})
export class AppModule {}
