import express from 'express';
import { Db } from './db';

export class Server {
  private server;
  private db;

  constructor() {
    this.server = express();
    this.db = new Db();
  }

  private config() {
    this.server.use(express.json({ limit: '1mb' }));
    this.server.use(express.urlencoded({ extended: true }));
  }

  public async createServer() {
    try {
      this.config();
      await this.db.connectDb();
    } catch (err) {
      console.log(`There has been some error: ${err}`);
    }
  }
}
