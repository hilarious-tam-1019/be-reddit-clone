import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { CustomContext } from '@/types/context';
import { Posts } from '@/module/post/model/post.model';
import prisma from '@/config/prismaClient.config';
@Resolver((of) => Posts)
export class PostResolver {
  @Query(() => Posts)
  async getAllPost(@Ctx() ctx: CustomContext): Promise<Posts | any> {
    try {
      const userEmail = ctx.req.session?.userId?.email;
    } catch (e) {
      console.log('Unable to get the post', e);
      throw new Error('There is no session in the request');
    }
  }
}
