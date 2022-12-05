import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Express } from 'express';
import prisma from './config/prisma-client.config';
import path from 'path';

export const initApolloServer = async (app: Express) => {
  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [
          // TODO: path resolver
          path.resolve(__dirname, '**', 'modules', '*.resolver.{js,ts}'),
        ],
      }),
      context: () => ({ prisma }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
  } catch (e) {
    console.log('Something wrong while setting up Apollo-server: \n', e);
  }
};
