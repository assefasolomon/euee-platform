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

export async function seedMathG12Unit1ChapterReviewPart2(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const exam = await prisma.chapterExam.findUnique({ where: { id: "math-g12-u1-review" } });

  const questions = [
    {
      id: "math-g12-u1-review-q11", order: 11, difficulty: 2, tags: ["applications", "arithmetic_sequence"],
      stem: "A library adds 25 new books every month, starting with 300 books. How many books are there after 6 months (using a_1 as month 0)?",
      options: [{ id: "A", text: "450 birr" }, { id: "B", text: "450 books" }, { id: "C", text: "425 books" }, { id: "D", text: "475 books" }],
      correctOptionId: "B",
      explanationCorrect: "a_1=300, d=25. After 6 months is the 7th term: a_7 = 300 + (7-1)(25) = 300 + 150 = 450 books.",
      explanationsWrong: { A: "Correct number but wrong unit label, not a currency amount.", C: "Uses (n-1)=5 instead of 6, an off-by-one error.", D: "Uses (n-1)=7 instead of 6, overshooting by one step." },
      commonMistakes: "Miscounting which term number corresponds to 6 months later when a_1 represents month 0.",
      hints: ["If a_1 is month 0, which term represents month 6?", "Month 6 corresponds to a_7, since a_1 is the starting point before any months pass."],
    },
    {
      id: "math-g12-u1-review-q12", order: 12, difficulty: 3, tags: ["applications", "geometric_sequence"],
      stem: "An investment of 10,000 birr earns 6% annual compound interest. What is its value after 3 years (using a_1 as the value at year 0)?",
      options: [{ id: "A", text: "11,800 birr" }, { id: "B", text: "11,910.16 birr" }, { id: "C", text: "10,600 birr" }, { id: "D", text: "12,000 birr" }],
      correctOptionId: "B",
      explanationCorrect: "a_1=10000, r=1.06. After 3 years is a_4: a_4 = 10000 * (1.06)^3 = 10000 * 1.191016 = 11,910.16 birr.",
      explanationsWrong: { A: "Uses simple interest (arithmetic) style calculation instead of compound (geometric).", C: "This is only one year of growth, a_2, not three years.", D: "A rough estimate that does not match the precise compound calculation." },
      commonMistakes: "Applying simple (arithmetic) interest thinking to a compound (geometric) interest problem.",
      hints: ["Compound interest means multiplying by 1.06 every year, not adding a fixed amount.", "a_1 is year 0, so year 3 corresponds to a_4."],
    },
    {
      id: "math-g12-u1-review-q13", order: 13, difficulty: 2, tags: ["applications"],
      stem: "Which pattern does 'a machine produces 50 more units each day than the day before' describe?",
      options: [{ id: "A", text: "Geometric, since production is growing" }, { id: "B", text: "Arithmetic, since a fixed number of units is added each day" }, { id: "C", text: "Neither, since this cannot be modeled by a sequence" }, { id: "D", text: "Geometric, with common ratio 50" }],
      correctOptionId: "B",
      explanationCorrect: "A fixed unit amount (50) added each day, regardless of the current total, is repeated addition, arithmetic, not a percentage-based multiplier.",
      explanationsWrong: { A: "Growth alone does not imply geometric; the mechanism (fixed addition) is what matters.", C: "This is a standard arithmetic sequence and can absolutely be modeled this way.", D: "50 is a fixed difference here, not a ratio; there is no multiplication involved." },
      commonMistakes: "Assuming any growing quantity must be geometric, without checking whether the growth is additive or multiplicative.",
      hints: ["Is 50 units added as a fixed number, or as a percentage of the current amount?", "A fixed number added each time is the definition of a common difference."],
    },
    {
      id: "math-g12-u1-review-q14", order: 14, difficulty: 3, tags: ["sigma_notation", "arithmetic_sequence"],
      stem: "What is the sum from n=1 to 20 of (2n - 1)? (Hint: this sums the first 20 odd numbers.)",
      options: [{ id: "A", text: "400" }, { id: "B", text: "380" }, { id: "C", text: "420" }, { id: "D", text: "390" }],
      correctOptionId: "A",
      explanationCorrect: "This is arithmetic with a_1=1, d=2. a_20 = 1+(19)(2) = 39. S_20 = 20/2 * (1+39) = 10*40 = 400.",
      explanationsWrong: { B: "Does not match the correctly computed sum using the shortcut formula.", C: "An overcount likely from a miscalculated a_20 or wrong term count.", D: "Close but does not match the precise shortcut formula result." },
      commonMistakes: "Miscalculating a_20 before applying the sum shortcut, or trying to add all 20 terms manually and making an error.",
      hints: ["First identify this as arithmetic and find a_1 and d.", "Find a_20 using the general term formula, then apply the sum shortcut S_k = k/2 * (a_1+a_k)."],
    },
    {
      id: "math-g12-u1-review-q15", order: 15, difficulty: 3, tags: ["infinite_series", "applications"],
      stem: "A ball dropped from 20 meters bounces back to 50% of its previous height each time. What is the total upward distance traveled (as an infinite series)?",
      options: [{ id: "A", text: "20 meters" }, { id: "B", text: "40 meters" }, { id: "C", text: "30 meters" }, { id: "D", text: "The series diverges" }],
      correctOptionId: "B",
      explanationCorrect: "The bounce heights form a geometric sequence a_1=20, r=0.5. Total: S = 20/(1-0.5) = 20/0.5 = 40 meters.",
      explanationsWrong: { A: "This is just a_1, not the total sum of all bounces.", C: "Does not match the correctly applied convergence formula.", D: "Incorrect, |r|=0.5 is less than 1, so this converges to a finite total." },
      commonMistakes: "Forgetting to apply the infinite series formula and instead just using the first drop height.",
      hints: ["The bounce heights form a geometric sequence, identify a_1 and r.", "Since |r| < 1, apply S = a_1/(1-r)."],
    },
    {
      id: "math-g12-u1-review-q16", order: 16, difficulty: 2, tags: ["sequences", "general_term"],
      stem: "A sequence has general term a_n = 100 - 4n. Is a_30 positive, negative, or zero?",
      options: [{ id: "A", text: "Positive" }, { id: "B", text: "Negative" }, { id: "C", text: "Zero" }, { id: "D", text: "Cannot be determined" }],
      correctOptionId: "B",
      explanationCorrect: "a_30 = 100 - 4(30) = 100 - 120 = -20, which is negative.",
      explanationsWrong: { A: "Does not match the correct calculation, which gives a negative result.", C: "a_25 would give zero (100-100=0), not a_30.", D: "This can absolutely be determined by direct substitution." },
      commonMistakes: "Arithmetic errors in the substitution, or confusing which term number gives exactly zero.",
      hints: ["Substitute n=30 directly into 100-4n.", "4 times 30 is 120; 100 minus 120 is negative."],
    },
    {
      id: "math-g12-u1-review-q17", order: 17, difficulty: 1, tags: ["geometric_sequence"],
      stem: "In a geometric sequence, if a_1 = 6 and r = 1, what is a_10?",
      options: [{ id: "A", text: "6" }, { id: "B", text: "60" }, { id: "C", text: "6^10" }, { id: "D", text: "0" }],
      correctOptionId: "A",
      explanationCorrect: "a_10 = 6 * 1^9 = 6 * 1 = 6. When r=1, every term equals a_1, since multiplying by 1 never changes the value.",
      explanationsWrong: { B: "Incorrectly treats r=1 as if it were an arithmetic common difference.", C: "Confuses the base and exponent; the exponent applies to r, not a_1.", D: "There is no reason for the sequence to become zero." },
      commonMistakes: "Forgetting that a common ratio of exactly 1 means every term in the sequence is identical.",
      hints: ["What does multiplying by 1 do to a number?", "If r=1, every single term equals a_1, no matter how far out you go."],
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

  console.log("Math G12 Unit 1 Chapter Review Part 2: OK - 7 questions (Lesson 5 applications plus varied coverage). Total bank now at 17 questions.");
}
