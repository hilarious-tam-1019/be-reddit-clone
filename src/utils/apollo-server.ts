import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Express } from 'express';
import path from 'path';

import prisma from './config/prisma-client.config';
import {UserResolver} from '../modules/user/user.resolver';

export const initApolloServer = async (app: Express) => {
  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver]
      }),
      context: ({ req, res }) => ({ req, res }),
    });
    
    //starting apolloServer
    await apolloServer.start();

    //appyling middlewares to the server
    apolloServer.applyMiddleware({ app });

  } catch (e) {
    console.log('Something wrong while setting up Apollo-server: \n', e);
  }
};
