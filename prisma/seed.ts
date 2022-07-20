import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const categoryData: Prisma.CategoriesCreateManyInput[] = [
  { value: 'activities' },
  { value: 'career' },
  { value: 'culture' },
  { value: 'dance' },
  { value: 'foods' },
  { value: 'hobby' },
  { value: 'study' },
  { value: 'travel' },
];

async function main(): Promise<void> {
  console.log(`Start seeding ...`);
  await prisma.categories.deleteMany();

  await prisma.categories.createMany({
    data: categoryData,
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
