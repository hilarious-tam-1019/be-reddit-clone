import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';

import prisma from '@/config/prismaClient.config';
import { CustomContext } from '@/types/context';
import { AuthInput } from '@/module/auth/input/auth.input';
import { Auth } from '@/module/auth/model/auth.model';

@Resolver((of) => Auth)
export class AuthResolver {
  @Query(() => String)
  async hello() {
    return 'hello world!';
  }

  @Mutation(() => Auth, { nullable: true })
  async register(
    @Arg('data') data: AuthInput,
    @Ctx() ctx: CustomContext
  ): Promise<Auth | any> {
    let user;
    try {
      // hashed password before saving to the database
      data.password = await bcrypt.hash(data.password, 12);

      user = await prisma.users.create({ data });
    } catch (e) {
      console.log('Trouble during row creation: \n', e);
      throw new Error('Email or username is already in use');
    }

    // setting session in user cookie
    ctx.req.session.userId = { id: user.id, email: user.email };
    return {
      ...user,
    };
  }

  @Mutation(() => Auth, { nullable: true })
  async login(
    @Arg('data') data: AuthInput,
    @Ctx() ctx: CustomContext
  ): Promise<Auth | any> {
    const { email, password, username } = data;

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    // TODO: checking confirmation of email

    ctx.req.session.userId = { id: user.id, email: user.email };

    return {
      ...user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: CustomContext): Promise<any> {
    return new Promise((res, rej) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie('connect.sid');
        return res(true);
      });
    });
  }
}
