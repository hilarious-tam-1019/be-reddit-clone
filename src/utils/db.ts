import { PrismaClient } from '@prisma/client';

export class Db {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async connectDb() {
    try {
      await this.prisma
        .$connect()
        .then(() => console.log('Database connected ...'));
    } catch (err) {
      console.log('Trouble connecting to the database ', err);
    }
  }
}
