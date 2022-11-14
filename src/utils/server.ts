import express from 'express';

export class Server {
  private server;

  constructor() {
    this.server = express();
  }

  private config() {
    this.server.use(express.json({ limit: '1mb' }));
    this.server.use(express.urlencoded({ extended: true }));
  }

  public createServer() {
    try {
      this.config();
      this.server.listen(3000, () => {
        console.log('Listening on port 3000... ');
      });
    } catch (err) {
      console.log(`There has been some error: ${err}`);
    }
  }
}
