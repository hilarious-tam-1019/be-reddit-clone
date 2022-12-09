import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from '@/config/redis.config';

import { healthCheckDB } from '@/utils/healthcheckDB';
import { apolloServer } from '@/utils/apolloServer';

const port = process.env['PORT'] || 3000;

async function main() {
  try {
    const app = express();

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));

    // setting up session storage
    const RedisStore = connectRedis(session);
    app.use(
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

    // database health check before starting the app
    await healthCheckDB();

    // init apollo server
    await apolloServer(app);

    app.listen(port, () => {
      console.log(`Listening on port ${port} ....`);
    });
  } catch (e) {
    console.log(`There has been some error: ${e}`);
  }
}
main();
