import { buildSchema } from 'type-graphql';

import { AuthResolver } from '@/module/auth/auth.resolver';

export const schemaBuilder = () =>
  buildSchema({
    resolvers: [AuthResolver],
  });
