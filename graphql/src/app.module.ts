import { Module } from '@nestjs/common';
import { FakeUsersCacheService } from './users/fake-users-cache-preload.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlAuthGuard } from './authorization/gqlAuthGuard';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './../database/typeOrmConfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthorizationModule, 
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModule),
    CacheModule.register({ isGlobal: true, max: 200 })
  ],
  controllers: [AppController],
  providers: [FakeUsersCacheService, GqlAuthGuard,AppService],
})
export class AppModule {}
