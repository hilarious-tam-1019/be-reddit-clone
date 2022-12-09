import prisma from '@/config/prismaClient.config';

export const healthCheckDB = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`.then(() =>
      console.log('Database connected ...')
    );
  } catch (err) {
    console.log('Trouble connecting to the database \n', err);
  }
};
