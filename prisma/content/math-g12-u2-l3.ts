import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit2Lesson3(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit2 = await prisma.unit.upsert({
    where: { id: "math-g12-u2" },
    update: {},
    create: { id: "math-g12-u2", subjectId: math.id, gradeLevel: 12, order: 2, title: "Introduction to Calculus", conceptTags: ["derivatives", "product_rule", "quotient_rule"] },
  });

  const lesson3 = await prisma.lesson.upsert({
    where: { id: "math-g12-u2-l3" },
    update: {
      learningObjectives: [
        "Apply the product rule to differentiate a product of two functions",
        "Apply the quotient rule to differentiate a ratio of two functions",
        "Recognize when the product or quotient rule is needed instead of the simpler power/sum rules",
      ],
      summaryMd: "The power rule and sum rule from the last lesson only work for functions built from adding power terms together. When two functions are multiplied, use the product rule: (uv)' = u'v + uv'. When one function is divided by another, use the quotient rule: (u/v)' = (u'v - uv')/v^2. Recognizing which rule applies is the key skill: multiplication of two x-dependent expressions needs the product rule; division needs the quotient rule.",
      additionalExamplesMd: "Extra Example 1: Differentiate f(x) = x^2 * (x+1) using the product rule. Let u=x^2, v=(x+1). u'=2x, v'=1. f'(x) = 2x(x+1) + x^2(1) = 2x^2+2x+x^2 = 3x^2+2x.\n\nExtra Example 2: Differentiate f(x) = (x+3)/(x-1) using the quotient rule. Let u=(x+3), v=(x-1). u'=1, v'=1. f'(x) = [1(x-1) - (x+3)(1)] / (x-1)^2 = [x-1-x-3]/(x-1)^2 = -4/(x-1)^2.\n\nExtra Example 3: Note that f(x) = x^2 + (x+1) does NOT need the product rule, since the terms are added, not multiplied, this just needs the sum rule from the last lesson: f'(x) = 2x + 1.",
    },
    create: {
      id: "math-g12-u2-l3", unitId: unit2.id, order: 3, title: "Differentiation Rules: Product and Quotient", difficultyTier: 3,
      learningObjectives: [
        "Apply the product rule to differentiate a product of two functions",
        "Apply the quotient rule to differentiate a ratio of two functions",
        "Recognize when the product or quotient rule is needed instead of the simpler power/sum rules",
      ],
      summaryMd: "The power rule and sum rule from the last lesson only work for functions built from adding power terms together. When two functions are multiplied, use the product rule: (uv)' = u'v + uv'. When one function is divided by another, use the quotient rule: (u/v)' = (u'v - uv')/v^2. Recognizing which rule applies is the key skill: multiplication of two x-dependent expressions needs the product rule; division needs the quotient rule.",
      additionalExamplesMd: "Extra Example 1: Differentiate f(x) = x^2 * (x+1) using the product rule. Let u=x^2, v=(x+1). u'=2x, v'=1. f'(x) = 2x(x+1) + x^2(1) = 2x^2+2x+x^2 = 3x^2+2x.\n\nExtra Example 2: Differentiate f(x) = (x+3)/(x-1) using the quotient rule. Let u=(x+3), v=(x-1). u'=1, v'=1. f'(x) = [1(x-1) - (x+3)(1)] / (x-1)^2 = [x-1-x-3]/(x-1)^2 = -4/(x-1)^2.\n\nExtra Example 3: Note that f(x) = x^2 + (x+1) does NOT need the product rule, since the terms are added, not multiplied, this just needs the sum rule from the last lesson: f'(x) = 2x + 1.",
    },
  });

  console.log("Math G12 Unit 2 Lesson 3 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit2Lesson3Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson3 = await prisma.lesson.findUnique({ where: { id: "math-g12-u2-l3" } });

  const s3a = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l3-s1" },
    update: {},
    create: {
      id: "math-g12-u2-l3-s1", lessonId: lesson3.id, order: 1, title: "The Product Rule",
      contentMd: "The sum rule from the last lesson works when functions are added. But what happens when two functions are multiplied together, like f(x) = x^2 * (x+3)? You might guess you can just differentiate each part separately and multiply the results, but that guess is wrong, and this lesson explains the correct method.\n\nThe product rule states: if f(x) = u(x) * v(x), then f'(x) = u'(x)*v(x) + u(x)*v'(x). In words: derivative of the first times the second, plus the first times the derivative of the second.\n\nWorked Example: f(x) = x^2 * (x+3). Let u=x^2 (so u'=2x) and v=(x+3) (so v'=1). Applying the rule: f'(x) = 2x*(x+3) + x^2*(1) = 2x^2+6x+x^2 = 3x^2+6x.\n\nCheck this differently: expand first, x^2*(x+3) = x^3+3x^2, then differentiate directly using the power/sum rule: f'(x) = 3x^2+6x. Same answer, confirming the product rule works, and showing that for simple cases you could also expand first, but the product rule is essential when expanding isn't practical (like with trigonometric or exponential functions later in your studies).",
      commonMistakesMd: "Assuming the derivative of a product is just the product of the derivatives (u'*v' is NOT correct); forgetting one of the two terms in the product rule formula; mixing up which function is u and which is v (though the formula is symmetric, so this specifically doesn't cause errors, but sign/term mistakes when substituting do).",
    },
  });

  const s3b = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l3-s2" },
    update: {},
    create: {
      id: "math-g12-u2-l3-s2", lessonId: lesson3.id, order: 2, title: "The Quotient Rule",
      contentMd: "Just as multiplication needed its own rule, division of two functions needs the quotient rule.\n\nIf f(x) = u(x)/v(x), then f'(x) = [u'(x)*v(x) - u(x)*v'(x)] / [v(x)]^2. Notice the numerator looks similar to the product rule but with a subtraction instead of addition, and the order matters (u' times v comes first, then subtract u times v').\n\nWorked Example: f(x) = (x+3)/(x-1). Let u=(x+3) (u'=1), v=(x-1) (v'=1). Applying the rule: f'(x) = [1*(x-1) - (x+3)*1] / (x-1)^2 = [(x-1)-(x+3)] / (x-1)^2 = [x-1-x-3]/(x-1)^2 = -4/(x-1)^2.\n\nThe order in the numerator is critical, unlike the product rule (which is a sum and doesn't care about order), the quotient rule is a subtraction, so u'v minus uv' gives a different (wrong) answer than uv' minus u'v.",
      commonMistakesMd: "Reversing the order of subtraction in the numerator (uv' minus u'v instead of u'v minus uv'); forgetting to square the denominator; forgetting the quotient rule entirely and trying to apply the product rule to a division problem.",
    },
  });

  const questions = [
    {
      id: "math-g12-u2-l3-q1", subLessonId: "s3a", difficulty: 3,
      stem: "Using the product rule, what is the derivative of f(x) = x^3 * (x+2)?",
      options: [{ id: "A", text: "4x^3 + 6x^2" }, { id: "B", text: "3x^2 + 1" }, { id: "C", text: "x^3" }, { id: "D", text: "4x^3" }],
      correctOptionId: "A",
      explanationCorrect: "Let u=x^3 (u'=3x^2), v=(x+2) (v'=1). f'(x) = 3x^2*(x+2) + x^3*(1) = 3x^3+6x^2+x^3 = 4x^3+6x^2.",
      explanationsWrong: { B: "Incorrectly differentiates each factor separately and adds them, ignoring the product rule structure entirely.", C: "This is just u itself, not the derivative of the product.", D: "Only accounts for part of the correct expansion." },
      commonMistakes: "Trying to differentiate each function separately and simply add the results, instead of applying the actual product rule formula.",
      hints: ["Identify u=x^3 and v=(x+2), find u' and v' separately first.", "Apply f'(x) = u'v + uv', substituting all four pieces."],
    },
    {
      id: "math-g12-u2-l3-q2", subLessonId: "s3a", difficulty: 2,
      stem: "In the product rule formula f'(x) = u'v + uv', if u=x^2 and v=5 (a constant), what is v'?",
      options: [{ id: "A", text: "5" }, { id: "B", text: "0" }, { id: "C", text: "1" }, { id: "D", text: "5x" }],
      correctOptionId: "B",
      explanationCorrect: "v=5 is a constant, and the derivative of any constant is always 0, regardless of what rule you're applying it within.",
      explanationsWrong: { A: "This is the constant's value, not its derivative.", C: "There is no reason the derivative of a constant would be 1.", D: "This incorrectly treats 5 as if it depended on x." },
      commonMistakes: "Forgetting that the constant-derivative-is-zero rule still applies even inside a larger formula like the product rule.",
      hints: ["What is the derivative of any plain number with no x in it?", "This is the same rule from the previous lesson, applied here as one piece of a bigger formula."],
    },
    {
      id: "math-g12-u2-l3-q3", subLessonId: "s3b", difficulty: 3,
      stem: "Using the quotient rule, what is the derivative of f(x) = x/(x+1)?",
      options: [{ id: "A", text: "1/(x+1)^2" }, { id: "B", text: "1" }, { id: "C", text: "-1/(x+1)^2" }, { id: "D", text: "x/(x+1)^2" }],
      correctOptionId: "A",
      explanationCorrect: "Let u=x (u'=1), v=(x+1) (v'=1). f'(x) = [1*(x+1) - x*1] / (x+1)^2 = [x+1-x]/(x+1)^2 = 1/(x+1)^2.",
      explanationsWrong: { B: "Does not correctly apply the quotient rule formula.", C: "Gets the sign wrong in the numerator; the correct subtraction gives +1, not -1.", D: "Incorrectly keeps x in the numerator instead of simplifying it away." },
      commonMistakes: "Sign errors in the numerator subtraction, or reversing the order of u'v and uv'.",
      hints: ["Identify u=x and v=(x+1), find u' and v'.", "Apply f'(x) = (u'v - uv')/v^2 in that exact order."],
    },
    {
      id: "math-g12-u2-l3-q4", subLessonId: "s3b", difficulty: 2,
      stem: "Which rule should be used to differentiate f(x) = (2x)/(x^2+1)?",
      options: [{ id: "A", text: "Product rule" }, { id: "B", text: "Quotient rule" }, { id: "C", text: "Sum rule alone" }, { id: "D", text: "Power rule alone" }],
      correctOptionId: "B",
      explanationCorrect: "This function is one expression divided by another, exactly the situation the quotient rule is designed for.",
      explanationsWrong: { A: "The product rule is for multiplication, not division.", C: "The sum rule alone cannot handle a division of two x-dependent expressions.", D: "The power rule alone works for single power terms, not a full ratio like this." },
      commonMistakes: "Confusing when to use the product rule versus the quotient rule, look specifically for a division sign versus a multiplication.",
      hints: ["Is the expression showing two things multiplied together, or one thing divided by another?", "A fraction with x in both the numerator and denominator needs the quotient rule."],
    },
  ];

  const subLessonMap = { s3a: s3a.id, s3b: s3b.id };

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
        conceptTags: ["product_rule", "quotient_rule"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 2 Lesson 3, Differentiation Rules content: OK - 2 sub-lessons, 4 questions.");
}
