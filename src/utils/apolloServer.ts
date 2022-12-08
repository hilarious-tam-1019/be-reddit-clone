import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { schemaBuilder } from './schemaBuilder';
import prisma from '../config/prismaClient.config';

export const apolloServer = async (app: Express) => {
  try {
    const schema = await schemaBuilder();

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }: any) => ({
        req,
        res,
        prisma,
      }),
    });

    //starting apolloServer
    await apolloServer.start();

    //appyling middlewares to the server
    apolloServer.applyMiddleware({ app, cors: false });
  } catch (e) {
    console.log('Something wrong while setting up apollo server: \n', e);
  }
};
