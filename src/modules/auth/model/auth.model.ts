import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Auth {
  @Field(() => ID)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  username?: string | null;

  @Field(() => Boolean)
  confirmed?: Boolean;
}
