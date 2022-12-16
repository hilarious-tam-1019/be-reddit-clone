import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Posts {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  content: string;
}
