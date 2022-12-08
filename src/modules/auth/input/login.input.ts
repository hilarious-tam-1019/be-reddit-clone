import { Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  confirmation?: boolean;
}
