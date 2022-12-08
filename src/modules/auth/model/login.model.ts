import { IsEmail } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Login {
  @Field(() => ID)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  username?: string | null;
}
