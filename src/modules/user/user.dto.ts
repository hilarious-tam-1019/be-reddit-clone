import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  email: string;

  password: string;
}
