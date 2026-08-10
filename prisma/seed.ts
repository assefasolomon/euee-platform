import { PrismaClient } from "@prisma/client";
import { seedMathG12Unit1Lesson1 } from "./content/math-g12-u1-l1";

const prisma = new PrismaClient();

async function main() {
  await seedMathG12Unit1Lesson1(prisma);
  console.log("All content modules seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
