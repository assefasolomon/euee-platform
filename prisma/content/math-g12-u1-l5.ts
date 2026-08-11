import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit1Lesson5(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit1 = await prisma.unit.upsert({
    where: { id: "math-g12-u1" },
    update: {},
    create: { id: "math-g12-u1", subjectId: math.id, gradeLevel: 12, order: 1, title: "Sequences and Series", conceptTags: ["sequences", "applications"] },
  });

  const lesson5 = await prisma.lesson.upsert({
    where: { id: "math-g12-u1-l5" },
    update: {
      learningObjectives: [
        "Recognize whether a real-world scenario follows an arithmetic or geometric pattern",
        "Correctly identify which term number (n) corresponds to a given point in time in an applied problem",
        "Apply general term and series formulas from this unit to solve realistic word problems",
      ],
      summaryMd: "This final lesson applies every idea from this unit, general terms, arithmetic and geometric patterns, sigma notation, and infinite series, to real situations. Fixed, repeated addition situations are arithmetic (salary raises, constant-rate filling). Fixed, repeated percentage situations are geometric (compound interest, population growth, depreciation). The most common error in applied problems is misidentifying which term number corresponds to which point in time, or misidentifying whether a situation is additive or multiplicative.",
      additionalExamplesMd: "Extra Example 1: A tree grows 20 cm per year, starting at 150 cm. Is this arithmetic or geometric? Answer: arithmetic, a fixed amount (20cm) is added each year, not a percentage.\n\nExtra Example 2: An investment of 5000 birr grows at 8% annual compound interest. Write the general term for its value after n years, where a_1 is the value at year 0. Answer: a_n = 5000 * (1.08)^(n-1), since each year multiplies by 1.08 (100% plus 8% growth).\n\nExtra Example 3: A charity commits to donating a decreasing amount each year forever: 10000 birr in year 1, then 70% of the previous year's amount every year after. What is the total amount donated over all time? This is an infinite geometric series: a_1=10000, r=0.7. S = 10000/(1-0.7) = 10000/0.3 = 33,333.33 birr total.",
    },
    create: {
      id: "math-g12-u1-l5", unitId: unit1.id, order: 5, title: "Applications of Sequences and Series", difficultyTier: 3,
      learningObjectives: [
        "Recognize whether a real-world scenario follows an arithmetic or geometric pattern",
        "Correctly identify which term number (n) corresponds to a given point in time in an applied problem",
        "Apply general term and series formulas from this unit to solve realistic word problems",
      ],
      summaryMd: "This final lesson applies every idea from this unit, general terms, arithmetic and geometric patterns, sigma notation, and infinite series, to real situations. Fixed, repeated addition situations are arithmetic (salary raises, constant-rate filling). Fixed, repeated percentage situations are geometric (compound interest, population growth, depreciation). The most common error in applied problems is misidentifying which term number corresponds to which point in time, or misidentifying whether a situation is additive or multiplicative.",
      additionalExamplesMd: "Extra Example 1: A tree grows 20 cm per year, starting at 150 cm. Is this arithmetic or geometric? Answer: arithmetic, a fixed amount (20cm) is added each year, not a percentage.\n\nExtra Example 2: An investment of 5000 birr grows at 8% annual compound interest. Write the general term for its value after n years, where a_1 is the value at year 0. Answer: a_n = 5000 * (1.08)^(n-1), since each year multiplies by 1.08 (100% plus 8% growth).\n\nExtra Example 3: A charity commits to donating a decreasing amount each year forever: 10000 birr in year 1, then 70% of the previous year's amount every year after. What is the total amount donated over all time? This is an infinite geometric series: a_1=10000, r=0.7. S = 10000/(1-0.7) = 10000/0.3 = 33,333.33 birr total.",
    },
  });

  console.log("Math G12 Unit 1 Lesson 5 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit1Lesson5Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson5 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l5" } });

  const s5 = await prisma.subLesson.upsert({
    where: { id: "math-g12-u1-l5-s1" },
    update: {},
    create: {
      id: "math-g12-u1-l5-s1", lessonId: lesson5.id, order: 1, title: "Modeling Real Situations with Sequences",
      contentMd: "This final lesson pulls together everything from this unit, general terms from Lesson 1, arithmetic and geometric patterns from Lesson 2, sigma notation from Lesson 3, and infinite series from Lesson 4, and applies them to real situations. The key skill here isn't new formulas, it's recognizing which type of sequence a real scenario actually follows.\n\nFixed, repeated addition situations are arithmetic: a worker's salary increasing by a fixed amount every year, a water tank being filled at a constant rate, or the equb example from Lesson 1, where every round adds exactly the same amount.\n\nFixed, repeated percentage situations are geometric: a bank account earning compound interest (each year's balance is multiplied by 1 plus the interest rate), a population growing by a fixed percentage each year, or a medicine's concentration in the bloodstream decreasing by a fixed percentage each hour.\n\nWorked Example: a phone that costs 8000 birr loses 10% of its value every year. Its value each year is a geometric sequence: a_1 = 8000, r = 0.90 (retaining 90% each year, since it loses 10%). After 3 years: a_4 = 8000 * (0.9)^3 = 8000 * 0.729 = 5832 birr. Notice this uses a_4, not a_3, because a_1 represents the value at year 0 (the start), so 3 years later corresponds to the 4th term in the sequence.\n\nThe most common error in applied problems isn't the formula, it's misidentifying which term number corresponds to which point in time, and misidentifying whether a real situation is additive (arithmetic) or multiplicative (geometric) in the first place.",
      commonMistakesMd: "Assuming a percentage-based real-world scenario is arithmetic just because the numbers happen to be increasing; miscounting which term number (n) corresponds to a given point in time, especially when a_1 represents a starting point at time zero.",
    },
  });

  const questions = [
    {
      id: "math-g12-u1-l5-q1", difficulty: 3,
      stem: "A car valued at 500,000 birr loses 15% of its value every year. What is its value after 2 years?",
      options: [{ id: "A", text: "425,000 birr" }, { id: "B", text: "361,250 birr" }, { id: "C", text: "350,000 birr" }, { id: "D", text: "372,500 birr" }],
      correctOptionId: "B",
      explanationCorrect: "Losing 15% each year means retaining 85%, so r = 0.85. This is geometric with a_1 = 500,000. After 2 years is the 3rd term: a_3 = 500,000 * (0.85)^2 = 500,000 * 0.7225 = 361,250 birr.",
      explanationsWrong: {
        A: "Subtracts 15% of the original value twice (arithmetic-style), instead of compounding the percentage loss multiplicatively each year.",
        C: "Does not match the correct compounding calculation for two years of 15% loss.",
        D: "A miscalculation of the compounding, possibly averaging or applying the percentage incorrectly.",
      },
      commonMistakes: "Treating a percentage-loss-per-year situation as arithmetic (subtracting a fixed amount) instead of geometric (multiplying by a retention rate each year).",
      hints: ["Losing 15% each year means the value is multiplied by 0.85 every year, not reduced by a fixed birr amount.", "After 2 years means the value has been multiplied by 0.85 twice: 500,000 * 0.85 * 0.85."],
    },
    {
      id: "math-g12-u1-l5-q2", difficulty: 2,
      stem: "A construction worker's daily wage starts at 200 birr and increases by 15 birr every week. What kind of sequence models this, and what is the wage in week 5?",
      options: [{ id: "A", text: "Geometric, 200 * (1.15)^4" }, { id: "B", text: "Arithmetic, a_5 = 200 + 4(15) = 260 birr" }, { id: "C", text: "Arithmetic, a_5 = 200 + 5(15) = 275 birr" }, { id: "D", text: "Geometric, cannot be determined" }],
      correctOptionId: "B",
      explanationCorrect: "A fixed birr amount (15) added each week is arithmetic, not a percentage, so geometric does not apply. Using a_n = a_1 + (n-1)d: a_5 = 200 + (5-1)(15) = 200 + 60 = 260 birr.",
      explanationsWrong: { A: "Incorrectly treats a fixed addition as a percentage-based geometric situation.", C: "Uses n instead of (n-1) in the arithmetic formula, an off-by-one error.", D: "Incorrectly labels this as geometric; it is clearly arithmetic since a fixed birr amount is added." },
      commonMistakes: "Misidentifying a fixed-amount increase as geometric, or using n instead of (n-1) in the arithmetic formula.",
      hints: ["Is 15 birr added as a percentage of the wage, or as a fixed amount regardless of the current wage?", "Since it is a fixed amount, this is arithmetic; use a_n = a_1 + (n-1)d with a_1=200 and d=15."],
    },
    {
      id: "math-g12-u1-l5-q3", difficulty: 3,
      stem: "A tank starts with 40 liters and a pump adds water so that the amount doubles every hour. Using a_1 as the amount at hour 0 (start), how much water is in the tank after 4 hours?",
      options: [{ id: "A", text: "160 liters" }, { id: "B", text: "320 liters" }, { id: "C", text: "640 liters" }, { id: "D", text: "80 liters" }],
      correctOptionId: "C",
      explanationCorrect: "This is geometric with a_1=40, r=2. After 4 hours corresponds to the 5th term (since a_1 is hour 0): a_5 = 40 * 2^4 = 40 * 16 = 640 liters.",
      explanationsWrong: { A: "Uses a_3 instead of a_5, undercounting the number of doublings by two.", B: "Uses a_4 instead of a_5, off by one term in the indexing.", D: "This is only after 1 hour (a_2 = 40*2 = 80), far short of 4 hours." },
      commonMistakes: "Miscounting which term number corresponds to 4 hours later when a_1 represents the starting point at hour 0, a very common off-by-one error in applied problems.",
      hints: ["If a_1 is hour 0, which term number represents hour 4? Count carefully: hour 1 is a_2, hour 2 is a_3, and so on.", "Hour 4 corresponds to a_5, since a_1 is the starting point before any hours have passed."],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id, subjectId: math.id, subLessonId: s5.id,
        conceptTags: ["applications", "arithmetic_sequence", "geometric_sequence"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 1 Lesson 5, Applications content: OK - 1 sub-lesson, 3 questions.");
}
