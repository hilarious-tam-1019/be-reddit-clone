import * as bcrypt from 'bcrypt';
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

const seedingDB = async () => {
  const tam = await prisma.user.upsert({
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
  console.log({ tam });
};

seedingDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
