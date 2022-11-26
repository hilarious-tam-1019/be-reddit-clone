import express from 'express';
import prisma from './config/prisma-client.config';

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
      await this.healthCheckDb();
      this.server.listen(port, () => {
        console.log(`Listening on port ${port} ....`);
      });
    } catch (err) {
      console.log(`There has been some error: ${err}`);
    }
  }
}
