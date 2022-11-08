import express from 'express';
import { Express } from 'express';
import { initTRPC } from '@trpc/server';

export async function createServer(): Promise<Express> {
  const server = express();
  server.use(express.json());
  return server;
}
