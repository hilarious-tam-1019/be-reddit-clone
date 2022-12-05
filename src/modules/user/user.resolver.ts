import { Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from './user.dto';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: '1231231',
      email: 'asdasd@gmail.com',
      username: 'asasdasd',
      password: 'asdad',
      post: [],
    };
  }
}
