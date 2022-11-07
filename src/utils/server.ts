import express from 'express';
import { Express } from 'express';

export async function createServer(): Promise<Express> {
  const server = express();
  server.use(express.json());
  server.get('/', (req, res) => {
    res.send('');
  });
  return server;
}
