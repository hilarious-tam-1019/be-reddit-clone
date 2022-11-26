// fixing trouble from importing prisma
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

// instaninate prisma client for the whole application
const prisma = new PrismaClient();

export default prisma;
