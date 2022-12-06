import {
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  UseMiddleware,
} from 'type-graphql';
import { User } from './user.dto';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }
}
