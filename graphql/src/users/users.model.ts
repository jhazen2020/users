import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';
import { UsersCategories, UsersCategoriesType } from './users_categories.model';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

@InputType()
export class Users {
  @Field(type => Int)
  id: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  firstName?: string;
  
  @IsNotEmpty()
  @Field({ nullable: false })
  lastName?: string;


  @IsPhoneNumber()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsNotEmpty()
  @IsEmail()
  @Field({ nullable: false })
  email?: string;

  @Field(type => UsersCategories)
  user_category: UsersCategories;
}

@InputType()
export class UsersUpdateInput {
  @Field(type => Int)
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  firstName?: string;
  
  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;
}

@InputType()
export class UsersInput {
  @IsNotEmpty()
  @Field({ nullable: false })
  firstName?: string;
  
  @IsNotEmpty()
  @Field({ nullable: false })
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber()
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsNotEmpty()
  @IsEmail()
  @Field({ nullable: false })
  email?: string;
}

@ObjectType()
export class UsersReturn {
  @Field(type => Int)
  id: number;

  @Field({nullable: true})
  firstName: string;
  
  @Field({nullable: true})
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  usersCategories: UsersCategoriesType;
}

@InputType()
export class UsersList {
  @Field(type => Int)
  limit: number;

  @Field({ nullable: true })
  cursor?: number;

  @Field({ nullable: true })
  order?: 'desc'|'asc'|'DESC'|'ASC';
}