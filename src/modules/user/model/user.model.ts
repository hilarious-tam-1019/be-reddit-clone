import { Posts } from '@/module/post/model/post.model';
import { Field, ID } from 'type-graphql';

export class Users {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  username?: string;

  post?: Posts[];

  @Field()
  confirmed?: boolean;
}
