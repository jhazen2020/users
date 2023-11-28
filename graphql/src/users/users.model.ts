import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UsersCategoriesType } from './users_categories.model';

@ObjectType()
export class Users {
  @Field(() => Int,  {nullable: true })
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  usersCategories?: UsersCategoriesType;
}
