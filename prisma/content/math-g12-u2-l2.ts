import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit2Lesson2(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit2 = await prisma.unit.upsert({
    where: { id: "math-g12-u2" },
    update: {},
    create: { id: "math-g12-u2", subjectId: math.id, gradeLevel: 12, order: 2, title: "Introduction to Calculus", conceptTags: ["limits", "derivatives", "power_rule"] },
  });

  const lesson2 = await prisma.lesson.upsert({
    where: { id: "math-g12-u2-l2" },
    update: {
      learningObjectives: [
        "State the limit definition of the derivative and explain what it represents geometrically",
        "Apply the power rule to differentiate functions of the form x^n",
        "Apply the sum rule to differentiate expressions with multiple terms",
        "Differentiate a constant term correctly",
      ],
      summaryMd: "The derivative of f(x) is defined as the limit of [f(x+h)-f(x)]/h as h approaches 0, representing the slope of the tangent line at a point. In practice, the power rule (bring down the exponent, reduce it by 1) and the sum rule (differentiate each term separately) let us skip the limit definition for most calculations. A constant term always has a derivative of 0.",
      additionalExamplesMd: "Extra Example 1: Differentiate f(x) = x^6. Answer: f'(x) = 6x^5.\n\nExtra Example 2: Differentiate f(x) = 2x^4 - 3x^2 + 7. Answer: differentiate each term: 8x^3 - 6x + 0 = 8x^3 - 6x.\n\nExtra Example 3: Differentiate f(x) = 10 (a constant function). Answer: f'(x) = 0, since a constant never changes, its rate of change is always zero.",
    },
    create: {
      id: "math-g12-u2-l2", unitId: unit2.id, order: 2, title: "The Derivative", difficultyTier: 2,
      learningObjectives: [
        "State the limit definition of the derivative and explain what it represents geometrically",
        "Apply the power rule to differentiate functions of the form x^n",
        "Apply the sum rule to differentiate expressions with multiple terms",
        "Differentiate a constant term correctly",
      ],
      summaryMd: "The derivative of f(x) is defined as the limit of [f(x+h)-f(x)]/h as h approaches 0, representing the slope of the tangent line at a point. In practice, the power rule (bring down the exponent, reduce it by 1) and the sum rule (differentiate each term separately) let us skip the limit definition for most calculations. A constant term always has a derivative of 0.",
      additionalExamplesMd: "Extra Example 1: Differentiate f(x) = x^6. Answer: f'(x) = 6x^5.\n\nExtra Example 2: Differentiate f(x) = 2x^4 - 3x^2 + 7. Answer: differentiate each term: 8x^3 - 6x + 0 = 8x^3 - 6x.\n\nExtra Example 3: Differentiate f(x) = 10 (a constant function). Answer: f'(x) = 0, since a constant never changes, its rate of change is always zero.",
    },
  });

  console.log("Math G12 Unit 2 Lesson 2 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit2Lesson2Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson2 = await prisma.lesson.findUnique({ where: { id: "math-g12-u2-l2" } });

  const s2a = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l2-s1" },
    update: {},
    create: {
      id: "math-g12-u2-l2-s1", lessonId: lesson2.id, order: 1, title: "From Limits to the Derivative",
      contentMd: "With limits established in the last lesson, we can now define the derivative precisely, using exactly that tool.\n\nThe derivative of f(x) at a point x is defined as: f'(x) = lim(h to 0) of [f(x+h) - f(x)] / h.\n\nThis looks abstract, but it formalizes the slope-of-a-secant-line idea: [f(x+h) - f(x)] / h is the slope between the point x and a nearby point x+h. As h shrinks toward 0 (using exactly the limit concept from the last lesson), that secant line's slope approaches the tangent line's slope, the derivative.\n\nThis definition would be slow to use every time, which is why the power rule exists as a proven shortcut: if f(x) = x^n, then f'(x) = n*x^(n-1). You can verify this shortcut actually comes from the limit definition, but in practice you will use the shortcut directly.\n\nWorked Example: for f(x) = x^5, the power rule gives f'(x) = 5x^4. Notice the exponent 5 became a multiplier, and the new exponent is 5-1=4.",
      commonMistakesMd: "Trying to memorize the limit definition formula without understanding it represents a secant line's slope shrinking toward a tangent line's slope; forgetting to reduce the exponent by exactly 1 when applying the power rule.",
    },
  });

  const s2b = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l2-s2" },
    update: {},
    create: {
      id: "math-g12-u2-l2-s2", lessonId: lesson2.id, order: 2, title: "The Sum Rule and Constants",
      contentMd: "When a function is made of several terms added together, you differentiate each term separately and add the results, this is the sum rule, and it is what makes calculus practical for real expressions rather than single power terms.\n\nWorked Example: f(x) = x^3 + 4x. Differentiate x^3 using the power rule: 3x^2. Differentiate 4x (which is 4x^1): 4*1*x^0 = 4. Sum the results: f'(x) = 3x^2 + 4.\n\nA subtle but important point: 4x's derivative is just 4, a constant, not 4x. This surprises many students, since it looks like the 4x should stay somehow. But recall a constant term's derivative is always 0, and a linear term's derivative is always its coefficient, this is really just the power rule applied to x^1.\n\nWorked Example: f(x) = 5. Since this is a constant with no x at all, its rate of change is always 0: f'(x) = 0. A horizontal line (constant function) has zero slope everywhere, which matches perfectly.",
      commonMistakesMd: "Treating a linear term like 4x as unchanged under differentiation, when its derivative is simply its coefficient (4); forgetting to differentiate every single term in a longer sum; forgetting that a lone constant differentiates to exactly 0.",
    },
  });

  const questions = [
    {
      id: "math-g12-u2-l2-q1", subLessonId: "s2a", difficulty: 2,
      stem: "If f(x) = x^4, what is f'(x)?",
      options: [{ id: "A", text: "x^3" }, { id: "B", text: "4x^3" }, { id: "C", text: "4x^4" }, { id: "D", text: "3x^4" }],
      correctOptionId: "B",
      explanationCorrect: "Using the power rule, f'(x) = n*x^(n-1) with n=4: f'(x) = 4x^3.",
      explanationsWrong: { A: "Drops the coefficient 4 from the front.", C: "Forgets to reduce the exponent by 1.", D: "Uses an incorrect exponent-reduction not matching n-1." },
      commonMistakes: "Forgetting to bring the exponent down as a coefficient, or forgetting to subtract 1 from it.",
      hints: ["The power rule has two parts: exponent becomes a multiplier, exponent drops by one.", "n=4, so new coefficient is 4, new exponent is 3."],
    },
    {
      id: "math-g12-u2-l2-q2", subLessonId: "s2a", difficulty: 3,
      stem: "What is the derivative of f(x) = x^(-2)? (Hint: the power rule works for negative exponents too.)",
      options: [{ id: "A", text: "-2x^(-3)" }, { id: "B", text: "-2x^(-1)" }, { id: "C", text: "2x^(-3)" }, { id: "D", text: "-2x^3" }],
      correctOptionId: "A",
      explanationCorrect: "The power rule works for any exponent, including negatives: f'(x) = -2 * x^(-2-1) = -2x^(-3).",
      explanationsWrong: { B: "Incorrectly reduces the exponent, should subtract 1 from -2 to get -3, not -1.", C: "Loses the negative sign that should carry over from the original exponent.", D: "Incorrectly makes the new exponent positive." },
      commonMistakes: "Mishandling the arithmetic of subtracting 1 from a negative exponent (-2 - 1 = -3, not -1).",
      hints: ["The power rule formula n*x^(n-1) works even when n is negative.", "-2 minus 1 equals -3, be careful with the negative number subtraction."],
    },
    {
      id: "math-g12-u2-l2-q3", subLessonId: "s2b", difficulty: 2,
      stem: "If f(x) = x^3 + 4x, what is f'(x)?",
      options: [{ id: "A", text: "3x^2 + 4" }, { id: "B", text: "3x^2 + 4x" }, { id: "C", text: "x^2 + 4" }, { id: "D", text: "3x^2 + x" }],
      correctOptionId: "A",
      explanationCorrect: "Differentiate each term: x^3 gives 3x^2; 4x gives 4. Sum: 3x^2 + 4.",
      explanationsWrong: { B: "Keeps 4x unchanged instead of taking its derivative, which is just 4.", C: "Forgets to bring down the exponent 3 as a coefficient.", D: "Mishandles the constant multiplier on the linear term." },
      commonMistakes: "Treating a linear term as if it doesn't change under differentiation.",
      hints: ["Differentiate each term separately, then add.", "4x is the same as 4x^1; what does the power rule give for that term?"],
    },
    {
      id: "math-g12-u2-l2-q4", subLessonId: "s2b", difficulty: 1,
      stem: "What is the derivative of the constant function f(x) = 12?",
      options: [{ id: "A", text: "12" }, { id: "B", text: "1" }, { id: "C", text: "0" }, { id: "D", text: "x" }],
      correctOptionId: "C",
      explanationCorrect: "A constant function never changes, so its rate of change (derivative) is always 0.",
      explanationsWrong: { A: "This is the original value, not the derivative.", B: "There is no reason the derivative would equal 1 here.", D: "Constants do not differentiate to x." },
      commonMistakes: "Forgetting that a plain number with no x has a derivative of exactly 0.",
      hints: ["Think about the graph of y=12, it's a flat horizontal line.", "What is the slope of a perfectly flat, horizontal line?"],
    },
  ];

  const subLessonMap = { s2a: s2a.id, s2b: s2b.id };

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
      create: {
        id: q.id, subjectId: math.id, subLessonId: subLessonMap[q.subLessonId],
        conceptTags: ["derivatives", "power_rule"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 2 Lesson 2, The Derivative content: OK - 2 sub-lessons, 4 questions.");
}
