const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany({});
  await prisma.score.deleteMany({});
  await prisma.task.createMany({ data: [
    { title: 'Finish assignment', important: true, completed: false },
    { title: 'Review lecture notes', important: false, completed: true, completedAt: new Date() },
    { title: 'Complete coding challenge', important: true, completed: false },
  ] });
  await prisma.score.create({ data: { value: 0 } });
  console.log('Database seeded successfully!');
}
main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => prisma.$disconnect());
