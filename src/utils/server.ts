import express from 'express';
import prisma from './client';

export class Server {
  private server;

  constructor() {
    this.server = express();
  }

  private config() {
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
      this.config();
      await this.healthCheckDb();
    } catch (err) {
      console.log(`There has been some error: ${err}`);
    }
  }
}
