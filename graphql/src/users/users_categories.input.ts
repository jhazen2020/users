import { Field, Int, InputType } from '@nestjs/graphql';
import { UUID } from 'crypto';

@InputType()
export class UsersCategories {
  @Field(type => Int)
  id: UUID;

  @Field({ nullable: false })
  name?: string;
}