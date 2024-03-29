import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UUID } from 'crypto';

@ObjectType()
export class UsersCategoriesType {
  @Field(type => Int)
  id: UUID;

  @Field({ nullable: false })
  name?: string;
}