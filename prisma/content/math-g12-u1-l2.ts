import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit1Lesson2(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit1 = await prisma.unit.upsert({
    where: { id: "math-g12-u1" },
    update: {},
    create: { id: "math-g12-u1", subjectId: math.id, gradeLevel: 12, order: 1, title: "Sequences and Series", conceptTags: ["sequences", "arithmetic_sequence", "geometric_sequence"] },
  });

  const lesson2 = await prisma.lesson.upsert({
    where: { id: "math-g12-u1-l2" },
    update: {
      learningObjectives: [
        "Identify a sequence as arithmetic by checking for a constant common difference",
        "Identify a sequence as geometric by checking for a constant common ratio",
        "Write and apply the general term formulas for both arithmetic and geometric sequences",
        "Distinguish which real-world situations follow an arithmetic pattern versus a geometric pattern",
      ],
      summaryMd: "Arithmetic sequences grow by repeated addition of a common difference (d), following a_n = a_1 + (n-1)d. Geometric sequences grow by repeated multiplication by a common ratio (r), following a_n = a_1 * r^(n-1). Check which pattern a sequence follows by subtracting consecutive terms (constant result means arithmetic) or dividing consecutive terms (constant result means geometric). This distinction matters beyond the classroom: fixed salary raises are arithmetic, while compound interest and population growth are geometric.",
      additionalExamplesMd: "Extra Example 1 (Arithmetic): A worker's monthly salary starts at 3000 birr and increases by 250 birr every year. Write the general term. Answer: a_n = 3000 + 250(n-1), since a_1 = 3000 and d = 250.\n\nExtra Example 2 (Geometric): A bacteria culture doubles every hour, starting with 50 bacteria. Write the general term and find the count after 5 hours. Answer: a_n = 50 * 2^(n-1). After 5 hours corresponds to a_6 (since a_1 is the starting count at hour 0): a_6 = 50 * 2^5 = 50 * 32 = 1600 bacteria.\n\nExtra Example 3 (Identifying the pattern): Is 100, 90, 80, 70 arithmetic or geometric? Check the difference: 90-100=-10, 80-90=-10, 70-80=-10. Constant difference of -10, so this is arithmetic with d=-10, decreasing.",
    },
    create: {
      id: "math-g12-u1-l2", unitId: unit1.id, order: 2, title: "Arithmetic and Geometric Sequences", difficultyTier: 2,
      learningObjectives: [
        "Identify a sequence as arithmetic by checking for a constant common difference",
        "Identify a sequence as geometric by checking for a constant common ratio",
        "Write and apply the general term formulas for both arithmetic and geometric sequences",
        "Distinguish which real-world situations follow an arithmetic pattern versus a geometric pattern",
      ],
      summaryMd: "Arithmetic sequences grow by repeated addition of a common difference (d), following a_n = a_1 + (n-1)d. Geometric sequences grow by repeated multiplication by a common ratio (r), following a_n = a_1 * r^(n-1). Check which pattern a sequence follows by subtracting consecutive terms (constant result means arithmetic) or dividing consecutive terms (constant result means geometric). This distinction matters beyond the classroom: fixed salary raises are arithmetic, while compound interest and population growth are geometric.",
      additionalExamplesMd: "Extra Example 1 (Arithmetic): A worker's monthly salary starts at 3000 birr and increases by 250 birr every year. Write the general term. Answer: a_n = 3000 + 250(n-1), since a_1 = 3000 and d = 250.\n\nExtra Example 2 (Geometric): A bacteria culture doubles every hour, starting with 50 bacteria. Write the general term and find the count after 5 hours. Answer: a_n = 50 * 2^(n-1). After 5 hours corresponds to a_6 (since a_1 is the starting count at hour 0): a_6 = 50 * 2^5 = 50 * 32 = 1600 bacteria.\n\nExtra Example 3 (Identifying the pattern): Is 100, 90, 80, 70 arithmetic or geometric? Check the difference: 90-100=-10, 80-90=-10, 70-80=-10. Constant difference of -10, so this is arithmetic with d=-10, decreasing.",
    },
  });

  console.log("Math G12 Unit 1 Lesson 2 shell created (objectives, summary, additional examples). Sub-lessons and questions come next.");
}

export async function seedMathG12Unit1Lesson2ArithmeticPart(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson2 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l2" } });

  const s2a = await prisma.subLesson.upsert({
    where: { id: "math-g12-u1-l2-s1" },
    update: {},
    create: {
      id: "math-g12-u1-l2-s1", lessonId: lesson2.id, order: 1, title: "Arithmetic Sequences",
      contentMd: "This lesson builds directly on what you learned in Lesson 1: a sequence is a rule that generates ordered terms. Now we look at the most common special case, one where the rule is simply add the same number every time.\n\nAn arithmetic sequence is a sequence where each term is found by adding a fixed number, called the common difference (d), to the previous term.\n\nIf the first term is a_1 and the common difference is d, the general term is: a_n = a_1 + (n-1)d\n\nWorked Example: the equb contributions from Lesson 1, 200, 350, 500, 650, have a_1 = 200 and d = 150, since each round adds exactly 150 birr more than the last. Using the formula: a_n = 200 + (n-1)(150), which matches the general-term approach from Lesson 1 exactly, arithmetic sequences are simply sequences whose general term has this specific linear shape.\n\nHow to check if a sequence is arithmetic: subtract each term from the next one. If the difference is always the same number, it's arithmetic. If the differences vary, it isn't.",
      commonMistakesMd: "Forgetting the formula uses (n-1), not n, since a_1 itself doesn't get d added to it; assuming any sequence that increases is automatically arithmetic without checking that the difference is constant.",
    },
  });

  const questions = [
    {
      id: "math-g12-u1-l2-q1", difficulty: 2,
      stem: "An arithmetic sequence has a_1 = 5 and common difference d = 4. What is a_6?",
      options: [{ id: "A", text: "20" }, { id: "B", text: "24" }, { id: "C", text: "25" }, { id: "D", text: "29" }],
      correctOptionId: "C",
      explanationCorrect: "Using a_n = a_1 + (n-1)d: a_6 = 5 + (6-1)(4) = 5 + 20 = 25.",
      explanationsWrong: { A: "Computes only (n-1)*d = 20 and forgets to add a_1.", B: "A common slip pattern that drops or misapplies part of the formula.", D: "Adds one extra step of the common difference beyond a_6." },
      commonMistakes: "Forgetting the formula uses (n-1), not n.",
      hints: ["The formula is a_1 plus (n-1) times d. How many times does d actually get added between term 1 and term 6?", "From a_1 to a_6 is 5 steps, not 6."],
    },
    {
      id: "math-g12-u1-l2-q2", difficulty: 2,
      stem: "The 3rd term of an arithmetic sequence is 11 and the 7th term is 27. What is the common difference d?",
      options: [{ id: "A", text: "3" }, { id: "B", text: "4" }, { id: "C", text: "5" }, { id: "D", text: "16" }],
      correctOptionId: "B",
      explanationCorrect: "The gap from term 3 to term 7 is 4 steps of d: 27 - 11 = 16 = 4d, so d = 4.",
      explanationsWrong: { A: "Divides by the wrong number of steps between the two given terms.", C: "Not consistent with either term when checked against the formula.", D: "This is 27 - 11 itself, without dividing by the number of steps." },
      commonMistakes: "Forgetting how many steps of d separate two named terms.",
      hints: ["How many times does d get added between term 3 and term 7?", "27 - 11 = 16, and that's 4 steps of d combined."],
    },
    {
      id: "math-g12-u1-l2-q3", difficulty: 3,
      stem: "Is the sequence 12, 9, 6, 3 arithmetic? If so, what is d?",
      options: [{ id: "A", text: "Yes, d = 3" }, { id: "B", text: "Yes, d = -3" }, { id: "C", text: "No, it is geometric" }, { id: "D", text: "Yes, d = -4" }],
      correctOptionId: "B",
      explanationCorrect: "Subtract consecutive terms: 9-12=-3, 6-9=-3, 3-6=-3. Constant difference of -3 confirms this is arithmetic with d=-3.",
      explanationsWrong: { A: "Uses the correct magnitude but the wrong sign, the sequence is decreasing.", C: "Check by division would give varying ratios (9/12, 6/9, 3/6 are not equal), so it is not geometric, but it is arithmetic.", D: "Does not match the actual constant difference found by subtracting consecutive terms." },
      commonMistakes: "Forgetting that a common difference can be negative when a sequence is decreasing.",
      hints: ["Subtract each term from the one after it, keeping track of the sign.", "A decreasing sequence has a negative common difference, not a positive one."],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id, subjectId: math.id, subLessonId: s2a.id,
        conceptTags: ["arithmetic_sequence", "common_difference"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 1 Lesson 2, Arithmetic Sequences sub-lesson: OK - 3 questions.");
}

export async function seedMathG12Unit1Lesson2GeometricPart(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson2 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l2" } });

  const s2b = await prisma.subLesson.upsert({
    where: { id: "math-g12-u1-l2-s2" },
    update: {},
    create: {
      id: "math-g12-u1-l2-s2", lessonId: lesson2.id, order: 2, title: "Geometric Sequences",
      contentMd: "Arithmetic sequences grow by repeated addition. Geometric sequences grow a different way: by repeated multiplication.\n\nA geometric sequence is a sequence where each term is found by multiplying the previous term by a fixed number, called the common ratio (r).\n\nIf the first term is a_1 and the common ratio is r, the general term is: a_n = a_1 * r^(n-1)\n\nWorked Example: 3, 6, 12, 24 is geometric with a_1 = 3 and r = 2, each term is double the one before it. Using the formula: a_4 = 3 * 2^3 = 3 * 8 = 24, which matches the pattern directly.\n\nA real-world example matters here: population growth is often modeled as geometric rather than arithmetic, because populations grow by a percentage rate (multiplication) rather than a fixed head-count addition. If a town's population grows 5% per year starting at 10,000, the yearly populations form a geometric sequence with a_1 = 10,000 and r = 1.05.\n\nHow to check if a sequence is geometric: divide each term by the one before it. If that ratio is always the same number, it's geometric. This is the multiplicative counterpart of the subtract-consecutive-terms check used for arithmetic sequences.",
      commonMistakesMd: "Trying to find a common difference by subtracting in a sequence that is actually geometric, subtraction won't give a constant value for a geometric sequence, only division will; confusing the common ratio r with the common difference d when switching between problem types.",
    },
  });

  const questions = [
    {
      id: "math-g12-u1-l2-q4", difficulty: 2,
      stem: "A geometric sequence has a_1 = 4 and common ratio r = 3. What is a_4?",
      options: [{ id: "A", text: "36" }, { id: "B", text: "48" }, { id: "C", text: "108" }, { id: "D", text: "324" }],
      correctOptionId: "C",
      explanationCorrect: "Using a_n = a_1 * r^(n-1): a_4 = 4 * 3^3 = 4 * 27 = 108.",
      explanationsWrong: { A: "Likely computed 4 * 3^2 instead of 3^3, one power short.", B: "Not consistent with the geometric formula for this sequence.", D: "Computed 4 * 3^4, one extra multiplication by r." },
      commonMistakes: "Using the wrong exponent, it's (n-1), not n.",
      hints: ["The exponent on r is (n-1), not n. For a_4, what is n-1?", "3 to the power of 3 is 27; then multiply by a_1 = 4."],
    },
    {
      id: "math-g12-u1-l2-q5", difficulty: 2,
      stem: "A geometric sequence has a_2 = 6 and a_3 = 18. What is a_1?",
      options: [{ id: "A", text: "1" }, { id: "B", text: "2" }, { id: "C", text: "3" }, { id: "D", text: "12" }],
      correctOptionId: "B",
      explanationCorrect: "Common ratio r = a_3/a_2 = 18/6 = 3. Then a_1 = a_2 / r = 6 / 3 = 2.",
      explanationsWrong: { A: "Does not satisfy a_1 * r = a_2 with the correct r found from the given terms.", C: "A plausible but incorrect division of the given terms.", D: "This is a_3 minus a_2, not a correct use of the geometric relationship." },
      commonMistakes: "Trying to subtract terms (an arithmetic approach) instead of dividing to find the ratio in a geometric sequence.",
      hints: ["First find r by dividing a later term by the one right before it.", "Once you know r, work backward from a_2 to find a_1 by dividing by r."],
    },
    {
      id: "math-g12-u1-l2-q6", difficulty: 3,
      stem: "Which situation is best modeled by a geometric sequence rather than an arithmetic one?",
      options: [
        { id: "A", text: "A worker's salary increasing by 300 birr every year" },
        { id: "B", text: "A water tank being filled at a constant rate of 10 liters per minute" },
        { id: "C", text: "A savings account earning 6% compound interest annually" },
        { id: "D", text: "A stack of chairs increasing by 5 chairs added each day" },
      ],
      correctOptionId: "C",
      explanationCorrect: "Compound interest multiplies the balance by a fixed percentage (1.06) every year, this is repeated multiplication, the defining feature of a geometric sequence.",
      explanationsWrong: { A: "A fixed birr amount added every year is repeated addition, arithmetic.", B: "A constant rate of addition (liters per minute) is arithmetic.", D: "A fixed count added each day is repeated addition, arithmetic." },
      commonMistakes: "Assuming any growing situation must be geometric, when the key test is whether growth is by a fixed amount (arithmetic) or a fixed percentage/multiplier (geometric).",
      hints: ["Look for the word 'percentage' or 'rate of' as opposed to a fixed birr or unit amount.", "Compound interest specifically means each year's growth is based on multiplying the current balance, not adding a fixed number."],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id, subjectId: math.id, subLessonId: s2b.id,
        conceptTags: ["geometric_sequence", "common_ratio"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 1 Lesson 2, Geometric Sequences sub-lesson: OK - 3 questions.");
}

export async function seedMathG12Unit1Lesson2Video(prisma) {
  const lesson2 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l2" } });

  await prisma.videoRecommendation.upsert({
    where: { id: "math-g12-u1-l2-v1" },
    update: {},
    create: {
      id: "math-g12-u1-l2-v1", lessonId: lesson2.id,
      youtubeUrl: "https://www.youtube.com/playlist?list=PLHgLUBSREUPl6Ie2hq2NdVdX3z-B8ldOi",
      title: "The Organic Chemistry Tutor - Sequences and Series (playlist)",
      reasonMd: "This same confirmed playlist includes dedicated videos titled Arithmetic Sequences and Arithmetic Series - Basic Introduction and Geometric Series and Geometric Sequences - Basic Introduction, matching both sub-lessons in this lesson directly, useful for seeing more worked examples of identifying which pattern a sequence follows.",
      reviewedByAdmin: true,
    },
  });

  console.log("Math G12 Unit 1 Lesson 2 video resource: OK.");
}
