import { PrismaClient } from "@prisma/client";
import { seedMathG12Unit1Lesson1 } from "./content/math-g12-u1-l1";
import { seedMathG12Unit1Lesson2 } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson2ArithmeticPart } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson2GeometricPart } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson2Video } from "./content/math-g12-u1-l2";

const prisma = new PrismaClient();

async function main() {
  await seedMathG12Unit1Lesson1(prisma);
  await seedMathG12Unit1Lesson2(prisma);
  await seedMathG12Unit1Lesson2ArithmeticPart(prisma);
  await seedMathG12Unit1Lesson2GeometricPart(prisma);
  await seedMathG12Unit1Lesson2Video(prisma);
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
