import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class UsersCategories {
  @Field(type => Int)
  id: UUID;

  @Field({ nullable: false })
  name?: string;
}

@ObjectType()
export class UsersCategoriesType {
  @Field(type => Int)
  id: UUID;

  @Field({ nullable: false })
  name?: string;
}