import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Express } from 'express';

export const initApolloServer = (app: Express) => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
};
