import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit1ChapterReviewPart1(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const unit1 = await prisma.unit.findUnique({ where: { id: "math-g12-u1" } });

  const exam = await prisma.chapterExam.upsert({
    where: { id: "math-g12-u1-review" },
    update: {},
    create: { id: "math-g12-u1-review", unitId: unit1.id, targetQuestionCount: 100 },
  });

  const questions = [
    {
      id: "math-g12-u1-review-q1", order: 1, difficulty: 1, tags: ["sequences"],
      stem: "Given a_n = 5n - 3, what is a_3?",
      options: [{ id: "A", text: "12" }, { id: "B", text: "15" }, { id: "C", text: "8" }, { id: "D", text: "2" }],
      correctOptionId: "A",
      explanationCorrect: "Substitute n=3: a_3 = 5(3) - 3 = 15 - 3 = 12.",
      explanationsWrong: { B: "Forgets to subtract 3 after multiplying.", C: "Computes 5-3 without multiplying by n first.", D: "An arithmetic slip in the subtraction step." },
      commonMistakes: "Forgetting the order of operations, multiply before subtracting.",
      hints: ["Substitute n=3 into the whole expression 5n-3.", "5 times 3 is 15; then subtract 3."],
    },
    {
      id: "math-g12-u1-review-q2", order: 2, difficulty: 1, tags: ["sequences", "finite_infinite"],
      stem: "A sequence is defined for n=1 through n=8 only. How many terms does this sequence have?",
      options: [{ id: "A", text: "7" }, { id: "B", text: "8" }, { id: "C", text: "Infinitely many" }, { id: "D", text: "9" }],
      correctOptionId: "B",
      explanationCorrect: "The domain n=1 through n=8 includes exactly 8 values, so the sequence has 8 terms.",
      explanationsWrong: { A: "Miscounts by one, forgetting to include both endpoints.", C: "Incorrect, since a specific upper limit (n=8) was stated.", D: "Overcounts by one." },
      commonMistakes: "Off-by-one errors when counting an inclusive range of integers.",
      hints: ["Count the integers from 1 to 8 inclusive, both endpoints count.", "8 minus 1 plus 1 equals how many terms?"],
    },
    {
      id: "math-g12-u1-review-q3", order: 3, difficulty: 2, tags: ["arithmetic_sequence"],
      stem: "An arithmetic sequence has a_1 = 7 and d = -2. What is a_5?",
      options: [{ id: "A", text: "-1" }, { id: "B", text: "1" }, { id: "C", text: "15" }, { id: "D", text: "-3" }],
      correctOptionId: "A",
      explanationCorrect: "a_5 = a_1 + (5-1)d = 7 + (4)(-2) = 7 - 8 = -1.",
      explanationsWrong: { B: "A sign error somewhere in the calculation.", C: "Adds instead of subtracts, treating d as positive.", D: "An arithmetic slip in the final subtraction." },
      commonMistakes: "Mishandling the negative sign when d is negative.",
      hints: ["d is negative here, so you are subtracting, not adding.", "7 + 4*(-2) = 7 - 8."],
    },
    {
      id: "math-g12-u1-review-q4", order: 4, difficulty: 2, tags: ["arithmetic_sequence"],
      stem: "Which of the following sequences is arithmetic?",
      options: [{ id: "A", text: "2, 4, 8, 16" }, { id: "B", text: "5, 8, 11, 14" }, { id: "C", text: "1, 4, 9, 16" }, { id: "D", text: "3, 9, 27, 81" }],
      correctOptionId: "B",
      explanationCorrect: "Check consecutive differences: 8-5=3, 11-8=3, 14-11=3. Constant difference of 3 confirms this is arithmetic.",
      explanationsWrong: { A: "This is geometric, each term doubles (ratio of 2), not a constant difference.", C: "These are perfect squares, neither a constant difference nor ratio.", D: "This is geometric with ratio 3, not arithmetic." },
      commonMistakes: "Confusing a geometric pattern (constant ratio) with an arithmetic one (constant difference).",
      hints: ["Check each option by subtracting consecutive terms, looking for a constant result.", "Only one option has the same difference between every pair of consecutive terms."],
    },
    {
      id: "math-g12-u1-review-q5", order: 5, difficulty: 2, tags: ["geometric_sequence"],
      stem: "A geometric sequence has a_1 = 2 and r = -3. What is a_3?",
      options: [{ id: "A", text: "18" }, { id: "B", text: "-18" }, { id: "C", text: "-6" }, { id: "D", text: "6" }],
      correctOptionId: "A",
      explanationCorrect: "a_3 = a_1 * r^(3-1) = 2 * (-3)^2 = 2 * 9 = 18. Note: a negative ratio squared becomes positive.",
      explanationsWrong: { B: "Forgets that a negative number squared is positive.", C: "Uses the wrong exponent (1 instead of 2).", D: "Computes 2*3 without accounting for the exponent or the sign correctly." },
      commonMistakes: "Forgetting that a negative common ratio raised to an even power becomes positive.",
      hints: ["r is negative, but you are raising it to the power of 2 (an even number).", "(-3) squared is 9, not -9."],
    },
    {
      id: "math-g12-u1-review-q6", order: 6, difficulty: 3, tags: ["geometric_sequence"],
      stem: "A geometric sequence has a_2 = 12 and a_4 = 48. What is a possible value of r?",
      options: [{ id: "A", text: "2" }, { id: "B", text: "4" }, { id: "C", text: "3" }, { id: "D", text: "1.5" }],
      correctOptionId: "A",
      explanationCorrect: "a_4 = a_2 * r^2, so 48 = 12 * r^2, giving r^2 = 4, so r = 2 (or r = -2, both are mathematically valid, 2 is listed here).",
      explanationsWrong: { B: "Does not satisfy 12 * r^2 = 48 when checked.", C: "Also does not satisfy the relationship correctly.", D: "Does not satisfy the relationship between a_2 and a_4." },
      commonMistakes: "Treating a_4/a_2 as r directly instead of r squared, since there are 2 steps of r between a_2 and a_4, not 1.",
      hints: ["How many multiplications by r separate a_2 from a_4? It is not just 1.", "48/12 = 4 = r^2, so what is r?"],
    },
    {
      id: "math-g12-u1-review-q7", order: 7, difficulty: 2, tags: ["sigma_notation"],
      stem: "What is the value of the sum from n=1 to 3 of (n^2 + 1)?",
      options: [{ id: "A", text: "17" }, { id: "B", text: "14" }, { id: "C", text: "20" }, { id: "D", text: "11" }],
      correctOptionId: "A",
      explanationCorrect: "Expand: n=1 gives 2, n=2 gives 5, n=3 gives 10. Sum: 2+5+10 = 17.",
      explanationsWrong: { B: "Forgets to add 1 to each squared term.", C: "An overcount in the expansion or addition.", D: "Only sums the n^2 parts without the +1 for each term." },
      commonMistakes: "Forgetting to add the constant term to every single expanded term, not just once at the end.",
      hints: ["Expand each term fully, including the +1, before adding.", "n=1: 1+1=2. n=2: 4+1=5. n=3: 9+1=10."],
    },
    {
      id: "math-g12-u1-review-q8", order: 8, difficulty: 3, tags: ["sigma_notation"],
      stem: "Using the arithmetic series formula, what is the sum of the first 8 terms of 2, 5, 8, 11...?",
      options: [{ id: "A", text: "88" }, { id: "B", text: "92" }, { id: "C", text: "100" }, { id: "D", text: "80" }],
      correctOptionId: "C",
      explanationCorrect: "a_1=2, d=3. First find a_8 = 2 + 7(3) = 2 + 21 = 23. Then S_8 = 8/2 * (2+23) = 4 * 25 = 100.",
      explanationsWrong: { A: "Uses a_7=20 instead of a_8=23 as the last term, an off-by-one error in the term count.", B: "Does not match the correctly computed sum with the right a_8 value.", D: "Does not match the correct sum; likely a miscalculation of a_8 or the averaging step." },
      commonMistakes: "Miscalculating a_8 using the general term formula before applying the sum shortcut, or using the wrong number of terms.",
      hints: ["First find a_8 using a_n = a_1 + (n-1)d with n=8.", "Then apply S_k = k/2 times (a_1 + a_k) using k=8 and your a_8 value."],
    },
    {
      id: "math-g12-u1-review-q9", order: 9, difficulty: 3, tags: ["infinite_series"],
      stem: "What is the sum of the infinite geometric series 12 + 6 + 3 + 1.5 + ...?",
      options: [{ id: "A", text: "24" }, { id: "B", text: "18" }, { id: "C", text: "12" }, { id: "D", text: "Diverges" }],
      correctOptionId: "A",
      explanationCorrect: "a_1=12, r=0.5. |r|<1, converges: S = 12/(1-0.5) = 12/0.5 = 24.",
      explanationsWrong: { B: "Does not match the correctly applied formula.", C: "This is just a_1, not the full sum.", D: "Incorrect, |r|=0.5 is less than 1, so it converges." },
      commonMistakes: "Forgetting to check convergence before applying the formula, or misidentifying r.",
      hints: ["Find r by dividing consecutive terms.", "Confirm |r| < 1, then apply S = a_1/(1-r)."],
    },
    {
      id: "math-g12-u1-review-q10", order: 10, difficulty: 3, tags: ["infinite_series"],
      stem: "Why does the infinite series 5 + 5 + 5 + 5 + ... diverge?",
      options: [
        { id: "A", text: "Because the terms are all positive" },
        { id: "B", text: "Because r = 1, and |r| is not less than 1" },
        { id: "C", text: "Because there is no first term" },
        { id: "D", text: "Because 5 is too large a number" },
      ],
      correctOptionId: "B",
      explanationCorrect: "Each term equals the last (constant terms means r=1). Since |r|=1 is not less than 1, the convergence condition fails, so the series diverges, the sum grows without bound.",
      explanationsWrong: { A: "Positivity alone does not cause divergence, many convergent series have all positive terms.", C: "There is a clear first term, 5.", D: "The size of the number is irrelevant, it is the ratio that determines convergence." },
      commonMistakes: "Not recognizing that a sequence of identical repeated terms has a common ratio of exactly 1.",
      hints: ["What is the common ratio when every term is the same number?", "Check the convergence condition |r| < 1 specifically."],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
      create: {
        id: q.id, subjectId: math.id, conceptTags: q.tags, difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        chapterReviewOrder: q.order,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
    await prisma.chapterExamQuestion.upsert({
      where: { chapterExamId_questionId: { chapterExamId: exam.id, questionId: q.id } },
      update: {},
      create: { chapterExamId: exam.id, questionId: q.id, order: q.order },
    });
  }

  console.log("Math G12 Unit 1 Chapter Review Part 1: OK - 10 questions (covering Lessons 1-4).");
}
