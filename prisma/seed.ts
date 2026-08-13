import { PrismaClient } from "@prisma/client";
import { seedMathG12Unit1Lesson1 } from "./content/math-g12-u1-l1";
import { seedMathG12Unit1Lesson2 } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson2ArithmeticPart } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson2GeometricPart } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson2Video } from "./content/math-g12-u1-l2";
import { seedMathG12Unit1Lesson3 } from "./content/math-g12-u1-l3";
import { seedMathG12Unit1Lesson3Content } from "./content/math-g12-u1-l3";
import { seedMathG12Unit1Lesson4 } from "./content/math-g12-u1-l4";
import { seedMathG12Unit1Lesson4Content } from "./content/math-g12-u1-l4";
import { seedMathG12Unit1Lesson5 } from "./content/math-g12-u1-l5";
import { seedMathG12Unit1Lesson5Content } from "./content/math-g12-u1-l5";
import { seedMathG12Unit1ChapterReviewPart1 } from "./content/math-g12-u1-chapter-review";
import { seedMathG12Unit1ChapterReviewPart2 } from "./content/math-g12-u1-chapter-review";
import { seedMathG12Unit1ChapterReviewPart3 } from "./content/math-g12-u1-chapter-review";
import { seedMathG12Unit2Lesson1 } from "./content/math-g12-u2-l1";
import { seedMathG12Unit2Lesson1Content } from "./content/math-g12-u2-l1";
import { seedMathG12Unit2Lesson2 } from "./content/math-g12-u2-l2";
import { seedMathG12Unit2Lesson2Content } from "./content/math-g12-u2-l2";
import { seedMathG12Unit2Lesson3 } from "./content/math-g12-u2-l3";
import { seedMathG12Unit2Lesson3Content } from "./content/math-g12-u2-l3";
import { seedMathG12Unit2Lesson4 } from "./content/math-g12-u2-l4";
import { seedMathG12Unit2Lesson4Content } from "./content/math-g12-u2-l4";
import { seedMathG12Unit2Lesson4Questions } from "./content/math-g12-u2-l4";

const prisma = new PrismaClient();

async function main() {
  await seedMathG12Unit1Lesson1(prisma);
  await seedMathG12Unit1Lesson2(prisma);
  await seedMathG12Unit1Lesson2ArithmeticPart(prisma);
  await seedMathG12Unit1Lesson2GeometricPart(prisma);
  await seedMathG12Unit1Lesson2Video(prisma);
  await seedMathG12Unit1Lesson3(prisma);
  await seedMathG12Unit1Lesson3Content(prisma);
  await seedMathG12Unit1Lesson4(prisma);
  await seedMathG12Unit1Lesson4Content(prisma);
  await seedMathG12Unit1Lesson5(prisma);
  await seedMathG12Unit1Lesson5Content(prisma);
  await seedMathG12Unit1ChapterReviewPart1(prisma);
  await seedMathG12Unit1ChapterReviewPart2(prisma);
  await seedMathG12Unit1ChapterReviewPart3(prisma);
  await seedMathG12Unit2Lesson1(prisma);
  await seedMathG12Unit2Lesson1Content(prisma);
  await seedMathG12Unit2Lesson2(prisma);
  await seedMathG12Unit2Lesson2Content(prisma);
  await seedMathG12Unit2Lesson3(prisma);
  await seedMathG12Unit2Lesson3Content(prisma);
  await seedMathG12Unit2Lesson4(prisma);
  await seedMathG12Unit2Lesson4Content(prisma);
  await seedMathG12Unit2Lesson4Questions(prisma);
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
