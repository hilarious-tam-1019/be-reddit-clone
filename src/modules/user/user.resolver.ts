import 'reflect-metadata';
import {
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  UseMiddleware,
} from 'type-graphql';
import { User } from './user.dto';

@Resolver(() => User)
export class UserResolver {
  // @Query((returns) => User)
  // async user() {
  //   return {
  //     id: 'asdasd',
  //     email: 'asdasd',
  //     username: 'asdawd',
  //   };
  // }
}
