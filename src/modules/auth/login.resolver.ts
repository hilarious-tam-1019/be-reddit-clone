import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';

import prisma from '../../config/prismaClient.config';
import { CustomContext } from '../../types/context';
import { LoginInput } from './input/login.input';
import { Login } from './model/login.model';

@Resolver((of) => Login)
export class LoginResolver {
  @Query(() => String)
  async hello() {
    return 'hello world!';
  }

  @Mutation(() => Login, { nullable: true })
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() ctx: CustomContext
  ): Promise<Login | null> {
    const { email, password, username } = data;
    const sessionId = ctx.req.session.id;
    // TODO: checking cache for sessionId;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    // TODO: checking confirmation of email

    // TODO: assigning `user.id` to req.session.userId

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
