import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';
import { UsersCategories, UsersCategoriesType } from './users_categories.model';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

@InputType()
export class Users {
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @Field({ nullable: false })
  firstName?: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber('US')
  @Field({ nullable: true })
  phoneNumber?: string;

  @IsNotEmpty()
  @IsEmail()
  @Field({ nullable: false })
  email?: string;

  @Field(() => UsersCategories)
  user_category: UsersCategories;
}

@InputType()
export class UsersUpdateInput {
  @IsOptional()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
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
  @IsOptional()
  @Field({ nullable: false })
  firstName?: string;

  @IsOptional()
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
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  usersCategories: UsersCategoriesType;
}


@InputType()
export class UsersListInput {
  @Field(() => Int)
  limit: number;

  @Field()
  page: number;

  @Field()
  order: 'desc' | 'asc' | 'DESC' | 'ASC';
}
