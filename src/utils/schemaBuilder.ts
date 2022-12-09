import { buildSchema } from 'type-graphql';

import { LoginResolver } from '@/modules/auth/login.resolver';

export const schemaBuilder = () =>
  buildSchema({
    resolvers: [LoginResolver],
  });
