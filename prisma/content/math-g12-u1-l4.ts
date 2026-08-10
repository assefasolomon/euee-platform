import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit1Lesson4(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit1 = await prisma.unit.upsert({
    where: { id: "math-g12-u1" },
    update: {},
    create: { id: "math-g12-u1", subjectId: math.id, gradeLevel: 12, order: 1, title: "Sequences and Series", conceptTags: ["sequences", "infinite_series"] },
  });

  const lesson4 = await prisma.lesson.upsert({
    where: { id: "math-g12-u1-l4" },
    update: {
      learningObjectives: [
        "Determine whether an infinite geometric series converges or diverges by checking the common ratio",
        "Apply the infinite geometric series sum formula when convergence conditions are met",
        "Explain why a series of infinitely many positive terms can still have a finite sum",
      ],
      summaryMd: "An infinite geometric series converges (has a finite sum) only when the absolute value of the common ratio r is less than 1. When it converges, the sum is S = a_1 / (1 - r). If |r| is 1 or greater, the series diverges and has no finite sum. This extends the finite sums from Lesson 3 into the infinite case, and relies on recognizing geometric sequences from Lesson 2.",
      additionalExamplesMd: "Extra Example 1: Does 4 + 4 + 4 + 4 + ... (constant terms) converge? Answer: here r=1 (each term equals the last, ratio of 1), and since |r| is not less than 1, this diverges, the sum grows without bound.\n\nExtra Example 2: Find the sum of 2 - 1 + 0.5 - 0.25 + ... Answer: a_1=2, r=-0.5 (note the ratio can be negative). |r|=0.5<1, so it converges: S = 2/(1-(-0.5)) = 2/1.5 = 4/3.\n\nExtra Example 3: A ball is dropped and each bounce reaches 60% of the previous height, starting at 10 meters. What is the total distance the ball travels bouncing (upward distances only, as an infinite series)? The heights form a geometric sequence a_1=10, r=0.6. Total upward distance: S = 10/(1-0.6) = 10/0.4 = 25 meters.",
    },
    create: {
      id: "math-g12-u1-l4", unitId: unit1.id, order: 4, title: "Infinite Series", difficultyTier: 3,
      learningObjectives: [
        "Determine whether an infinite geometric series converges or diverges by checking the common ratio",
        "Apply the infinite geometric series sum formula when convergence conditions are met",
        "Explain why a series of infinitely many positive terms can still have a finite sum",
      ],
      summaryMd: "An infinite geometric series converges (has a finite sum) only when the absolute value of the common ratio r is less than 1. When it converges, the sum is S = a_1 / (1 - r). If |r| is 1 or greater, the series diverges and has no finite sum. This extends the finite sums from Lesson 3 into the infinite case, and relies on recognizing geometric sequences from Lesson 2.",
      additionalExamplesMd: "Extra Example 1: Does 4 + 4 + 4 + 4 + ... (constant terms) converge? Answer: here r=1 (each term equals the last, ratio of 1), and since |r| is not less than 1, this diverges, the sum grows without bound.\n\nExtra Example 2: Find the sum of 2 - 1 + 0.5 - 0.25 + ... Answer: a_1=2, r=-0.5 (note the ratio can be negative). |r|=0.5<1, so it converges: S = 2/(1-(-0.5)) = 2/1.5 = 4/3.\n\nExtra Example 3: A ball is dropped and each bounce reaches 60% of the previous height, starting at 10 meters. What is the total distance the ball travels bouncing (upward distances only, as an infinite series)? The heights form a geometric sequence a_1=10, r=0.6. Total upward distance: S = 10/(1-0.6) = 10/0.4 = 25 meters.",
    },
  });

  console.log("Math G12 Unit 1 Lesson 4 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit1Lesson4Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson4 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l4" } });

  const s4 = await prisma.subLesson.upsert({
    where: { id: "math-g12-u1-l4-s1" },
    update: {},
    create: {
      id: "math-g12-u1-l4-s1", lessonId: lesson4.id, order: 1, title: "Summing an Infinite Geometric Series",
      contentMd: "So far, every sum you have computed has had a fixed, finite number of terms. This lesson asks a question that sounds impossible at first: can you add up infinitely many terms and get a normal, finite number?\n\nFor an infinite geometric series (a geometric sequence from Lesson 2, summed forever), the surprising answer is: sometimes yes. It depends entirely on the common ratio r.\n\nIf the absolute value of r is less than 1 (meaning -1 < r < 1), each term gets smaller and smaller, and the running total approaches a fixed limit, it converges. The formula for the sum of an infinite geometric series in this case is: S = a_1 / (1 - r).\n\nWorked Example: 1 + 1/2 + 1/4 + 1/8 + ... has a_1 = 1 and r = 1/2. Since |r| < 1, it converges: S = 1 / (1 - 0.5) = 1 / 0.5 = 2. Even though you are adding infinitely many positive numbers, the total never exceeds 2, it gets closer and closer to 2 without ever going past it.\n\nIf |r| is greater than or equal to 1, the terms do not shrink (they either stay the same size or grow), so the sum grows without bound, it diverges, and has no finite value. Checking whether |r| < 1 is therefore the essential first step before ever attempting to apply the infinite sum formula.",
      commonMistakesMd: "Applying the infinite sum formula without first checking that |r| < 1, the formula gives a meaningless number if this condition isn't satisfied; confusing this formula with the finite geometric series sum formula, which works for any r.",
    },
  });

  const questions = [
    {
      id: "math-g12-u1-l4-q1", difficulty: 3,
      stem: "What is the sum of the infinite geometric series 8 + 4 + 2 + 1 + ...?",
      options: [{ id: "A", text: "16" }, { id: "B", text: "12" }, { id: "C", text: "The series diverges, it has no finite sum" }, { id: "D", text: "8" }],
      correctOptionId: "A",
      explanationCorrect: "Here a_1 = 8 and r = 1/2 (each term is half the last). Since |r| < 1, the series converges: S = a_1/(1-r) = 8/(1-0.5) = 8/0.5 = 16.",
      explanationsWrong: { B: "Does not match the correct application of S = a_1/(1-r) with these values.", C: "The series does converge here because |r| = 0.5, which is less than 1.", D: "This is just the first term, not the sum of the whole infinite series." },
      commonMistakes: "Forgetting to check |r| < 1 before assuming a series has a finite sum, or misidentifying r from the sequence of terms.",
      hints: ["First find r by dividing a term by the one before it, then confirm whether |r| < 1.", "Once you know a_1 = 8 and r = 0.5, apply S = a_1/(1-r) directly."],
    },
    {
      id: "math-g12-u1-l4-q2", difficulty: 3,
      stem: "What is the sum of the infinite geometric series 5 + 5/3 + 5/9 + ...?",
      options: [{ id: "A", text: "7.5" }, { id: "B", text: "15" }, { id: "C", text: "10" }, { id: "D", text: "The series diverges" }],
      correctOptionId: "A",
      explanationCorrect: "Here a_1 = 5, r = 1/3 (each term is one-third of the last). Since |r| < 1, it converges: S = 5/(1-1/3) = 5/(2/3) = 7.5.",
      explanationsWrong: { B: "Does not match the correctly applied formula with these values.", C: "A plausible but incorrect simplification of the fraction in the formula.", D: "Incorrect, since |r| = 1/3 is less than 1, so the series does converge." },
      commonMistakes: "Making an error simplifying the fraction 1/(1-1/3), or misidentifying r from the given terms.",
      hints: ["Find r by dividing the second term by the first: (5/3)/5.", "1 - 1/3 = 2/3; dividing by a fraction means multiplying by its reciprocal."],
    },
    {
      id: "math-g12-u1-l4-q3", difficulty: 3,
      stem: "Does the infinite series 3 + 6 + 12 + 24 + ... converge or diverge?",
      options: [{ id: "A", text: "Converges, S = 6" }, { id: "B", text: "Converges, S = -3" }, { id: "C", text: "Diverges, since r = 2 and |r| is not less than 1" }, { id: "D", text: "Converges, S = 3" }],
      correctOptionId: "C",
      explanationCorrect: "Here r = 6/3 = 2. Since |r| = 2 is not less than 1, this series diverges, it has no finite sum, the formula S = a_1/(1-r) does not apply.",
      explanationsWrong: { A: "Incorrectly applies the convergent-series formula to a series that actually diverges.", B: "Also incorrectly assumes convergence and additionally miscalculates using the formula.", D: "This is just a_1, and also incorrectly assumes the series converges." },
      commonMistakes: "Applying the sum formula automatically without first checking whether |r| < 1, this series has a doubling ratio, so it clearly grows without bound.",
      hints: ["Find r first: divide 6 by 3, then 12 by 6, to confirm the ratio.", "Is |r| less than 1 here? If not, no finite sum formula applies."],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id, subjectId: math.id, subLessonId: s4.id,
        conceptTags: ["infinite_series", "convergence"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  await prisma.videoRecommendation.upsert({
    where: { id: "math-g12-u1-l4-v1" },
    update: {},
    create: {
      id: "math-g12-u1-l4-v1", lessonId: lesson4.id,
      youtubeUrl: "https://www.youtube.com/results?search_query=infinite+geometric+series+convergence+organic+chemistry+tutor",
      title: "Infinite Geometric Series (search results - needs manual review)",
      reasonMd: "Search-results placeholder, not yet verified. Needs manual review before marking reviewedByAdmin true.",
      reviewedByAdmin: false,
    },
  });

  console.log("Math G12 Unit 1 Lesson 4, Infinite Series content: OK - 1 sub-lesson, 3 questions, 1 video placeholder (needs review).");
}
