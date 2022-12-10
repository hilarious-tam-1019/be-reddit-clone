import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';

import prisma from '@/config/prismaClient.config';
import { CustomContext } from '@/types/context';
import { LoginInput } from '@/modules/auth/input/login.input';
import { Login } from '@/modules/auth/model/login.model';

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
  ): Promise<Login | any> {
    const { email, password, username } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    // TODO: checking confirmation of email

    ctx.req.session.userId = { ...data };

    return {
      ...user,
    };
  }
}
