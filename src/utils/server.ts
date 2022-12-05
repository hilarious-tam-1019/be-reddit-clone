import express from 'express';
import prisma from './config/prisma-client.config';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from './config/redis.config';
import { initApolloServer } from './apollo-server';

const port = process.env['PORT'] || 3000;

export class Server {
  private server;

  constructor() {
    this.server = express();
  }

  private serverConfig() {
    this.server.use(express.json({ limit: '1mb' }));
    this.server.use(express.urlencoded({ extended: true }));
  }

  private setUpSession() {
    const RedisStore = connectRedis(session);
    this.server.use(
      session({
        store: new RedisStore({
          client: Redis as any,
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          // setting true when need secure connection for production
          // seccure: process.env.NODE_ENV === 'production'
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
      })
    );
  }

  public async healthCheckDb() {
    try {
      await prisma.$queryRaw`SELECT 1`.then(() =>
        console.log('Database connected ...')
      );
    } catch (err) {
      console.log('Trouble connecting to the database \n', err);
    }
  }

  public async createServer() {
    try {
      this.serverConfig();

      // health checking database
      await this.healthCheckDb();

      // init type-graphql
      await initApolloServer(this.server);

      // setting up redis session
      this.setUpSession();

      this.server.listen(port, () => {
        console.log(`Listening on port ${port} ....`);
      });
    } catch (err) {
      console.log(`There has been some error: ${err}`);
    }
  }
}
