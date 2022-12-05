import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Express } from 'express';
import prisma from './config/prisma-client.config';

export const initApolloServer = async (app: Express) => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
    }),
    context: () => ({ prisma }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
};
