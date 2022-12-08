import * as bcrypt from 'bcrypt';
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

const seedingDB = async () => {
  console.log('Start seeding ... ');
  const user = await prisma.user.upsert({
    where: { email: 'tam@prisma.io ' },
    update: {},
    create: {
      email: 'tam@prisma.io',
      username: 'tam',
      password: await bcrypt.hash('tam', 12),
      post: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          likes: 0,
        },
      },
    },
  });
  console.log(`Created user with id: ${user.id}`);
  console.log(`Seeding finished`);
};

seedingDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(`Seeding database encouter some problem: \n`, e);
    await prisma.$disconnect();
    process.exit(1);
  });
