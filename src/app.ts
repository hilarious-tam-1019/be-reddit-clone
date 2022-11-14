import { Server } from './utils/server';

async function createServer() {
  const app = new Server();
  app.createServer();
}
createServer();
