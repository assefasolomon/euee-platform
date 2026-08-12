import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit2Lesson1(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit2 = await prisma.unit.upsert({
    where: { id: "math-g12-u2" },
    update: {},
    create: { id: "math-g12-u2", subjectId: math.id, gradeLevel: 12, order: 2, title: "Introduction to Calculus", conceptTags: ["limits", "derivatives"] },
  });

  const lesson1 = await prisma.lesson.upsert({
    where: { id: "math-g12-u2-l1" },
    update: {
      learningObjectives: [
        "Explain what a limit describes about a function's behavior near a point",
        "Evaluate limits by direct substitution when possible",
        "Evaluate limits that produce a 0/0 form by factoring and simplifying first",
      ],
      summaryMd: "A limit describes what value a function approaches as the input gets closer to a specific point, without necessarily reaching it. For most functions, direct substitution works. When substitution gives 0/0, factor the expression first, cancel common factors, then substitute again. This concept is the foundation for the derivative, introduced in the next lesson.",
      additionalExamplesMd: "Extra Example 1: Find lim(x to 4) of (x+3). Answer: direct substitution works here, 4+3=7.\n\nExtra Example 2: Find lim(x to 5) of (x^2-25)/(x-5). Direct substitution gives 0/0. Factor: (x-5)(x+5)/(x-5), cancel, leaving x+5. Substitute x=5: 10.\n\nExtra Example 3: Find lim(x to 1) of (x^3-1)/(x-1). Factor the numerator as a difference of cubes: (x-1)(x^2+x+1)/(x-1), cancel, leaving x^2+x+1. Substitute x=1: 1+1+1=3.",
    },
    create: {
      id: "math-g12-u2-l1", unitId: unit2.id, order: 1, title: "Limits", difficultyTier: 2,
      learningObjectives: [
        "Explain what a limit describes about a function's behavior near a point",
        "Evaluate limits by direct substitution when possible",
        "Evaluate limits that produce a 0/0 form by factoring and simplifying first",
      ],
      summaryMd: "A limit describes what value a function approaches as the input gets closer to a specific point, without necessarily reaching it. For most functions, direct substitution works. When substitution gives 0/0, factor the expression first, cancel common factors, then substitute again. This concept is the foundation for the derivative, introduced in the next lesson.",
      additionalExamplesMd: "Extra Example 1: Find lim(x to 4) of (x+3). Answer: direct substitution works here, 4+3=7.\n\nExtra Example 2: Find lim(x to 5) of (x^2-25)/(x-5). Direct substitution gives 0/0. Factor: (x-5)(x+5)/(x-5), cancel, leaving x+5. Substitute x=5: 10.\n\nExtra Example 3: Find lim(x to 1) of (x^3-1)/(x-1). Factor the numerator as a difference of cubes: (x-1)(x^2+x+1)/(x-1), cancel, leaving x^2+x+1. Substitute x=1: 1+1+1=3.",
    },
  });

  console.log("Math G12 Unit 2 Lesson 1 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit2Lesson1Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson1 = await prisma.lesson.findUnique({ where: { id: "math-g12-u2-l1" } });

  const s1 = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l1-s1" },
    update: {},
    create: {
      id: "math-g12-u2-l1-s1", lessonId: lesson1.id, order: 1, title: "What a Limit Means",
      contentMd: "Before calculus can talk about instantaneous rates of change, it needs a way to describe what happens to a function as the input gets closer and closer to some value, without necessarily ever reaching it. This idea is called a limit.\n\nThe notation 'the limit as x approaches 2 of f(x)' asks: as x gets closer and closer to 2 (from either side), what value does f(x) get closer and closer to? This is written as lim(x to 2) f(x).\n\nFor most ordinary functions, like polynomials, the limit as x approaches a value a is simply f(a), you can substitute directly. Worked Example: lim(x to 3) of (x^2 + 1) = 3^2 + 1 = 10.\n\nThe interesting cases are where direct substitution fails, usually because it produces a 0/0 form. Worked Example: lim(x to 2) of (x^2 - 4)/(x - 2). Substituting x=2 directly gives 0/0, undefined. But factoring the numerator: (x-2)(x+2)/(x-2), the (x-2) cancels (valid since x is approaching 2, not equal to 2), leaving x+2. Now substitute: 2+2 = 4. So the limit is 4, even though the original function is undefined exactly at x=2.\n\nThis distinction matters: a limit describes behavior near a point, not necessarily the function's actual value at that point. This is precisely the idea that makes the derivative possible in the next lesson, we look at the behavior of a curve near a point without needing the curve to be perfectly defined in a way that lets us divide by zero.",
      commonMistakesMd: "Assuming a limit doesn't exist just because direct substitution gives 0/0, this is a signal to factor and simplify, not a sign of no limit; confusing the limit's value with the function's actual value at that exact point, they can differ or one can be undefined while the other exists.",
    },
  });

  const questions = [
    {
      id: "math-g12-u2-l1-q1", difficulty: 2,
      stem: "What is lim(x to 3) of (x^2 - 9)/(x - 3)?",
      options: [{ id: "A", text: "0" }, { id: "B", text: "6" }, { id: "C", text: "Undefined, no limit exists" }, { id: "D", text: "3" }],
      correctOptionId: "B",
      explanationCorrect: "Factor the numerator: (x-3)(x+3)/(x-3). Cancel (x-3), leaving x+3. Substitute x=3: 3+3 = 6.",
      explanationsWrong: { A: "Does not correctly apply the factoring and cancellation needed here.", C: "The 0/0 form from direct substitution is a signal to factor, not a sign the limit doesn't exist.", D: "This is the x-value itself, not the result of evaluating the simplified expression." },
      commonMistakes: "Stopping after getting 0/0 from direct substitution instead of factoring first.",
      hints: ["Direct substitution gives 0/0, that means you should factor the numerator first.", "x^2 - 9 factors as (x-3)(x+3); what cancels with the denominator?"],
    },
    {
      id: "math-g12-u2-l1-q2", difficulty: 1,
      stem: "What is lim(x to 5) of (2x + 1)?",
      options: [{ id: "A", text: "10" }, { id: "B", text: "11" }, { id: "C", text: "5" }, { id: "D", text: "6" }],
      correctOptionId: "B",
      explanationCorrect: "This function has no issue at x=5, so direct substitution works: 2(5)+1 = 11.",
      explanationsWrong: { A: "Forgets to add 1 after multiplying.", C: "This is just the x-value, not the evaluated expression.", D: "An arithmetic slip in the calculation." },
      commonMistakes: "Trying to factor or simplify when direct substitution already works fine, since there's no 0/0 issue here.",
      hints: ["Check first: does direct substitution cause any problem (like division by zero)? If not, just substitute.", "2 times 5 is 10; then add 1."],
    },
    {
      id: "math-g12-u2-l1-q3", difficulty: 3,
      stem: "What is lim(x to -2) of (x^2 - 4)/(x + 2)?",
      options: [{ id: "A", text: "-4" }, { id: "B", text: "0" }, { id: "C", text: "4" }, { id: "D", text: "Undefined" }],
      correctOptionId: "A",
      explanationCorrect: "Direct substitution gives 0/0. Factor: (x-2)(x+2)/(x+2), cancel (x+2), leaving x-2. Substitute x=-2: -2-2 = -4.",
      explanationsWrong: { B: "Does not match the correctly simplified and evaluated expression.", C: "A sign error; forgets that x is approaching -2, a negative value.", D: "Incorrect, since factoring resolves the 0/0 form to a well-defined limit." },
      commonMistakes: "Sign errors when substituting a negative value, or forgetting to factor before concluding the limit doesn't exist.",
      hints: ["Direct substitution gives 0/0, factor the numerator as a difference of squares.", "After canceling, substitute x=-2 into what remains, being careful with the negative sign."],
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
        id: q.id, subjectId: math.id, subLessonId: s1.id,
        conceptTags: ["limits"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  await prisma.videoRecommendation.upsert({
    where: { id: "math-g12-u2-l1-v1" },
    update: {},
    create: {
      id: "math-g12-u2-l1-v1", lessonId: lesson1.id,
      youtubeUrl: "https://www.youtube.com/watch?v=zLozwNf5r-8",
      title: "Introduction to Limits",
      reasonMd: "Covers evaluating limits using direct substitution and a data table, with examples including rational and trigonometric functions, matching this lesson's core skill of evaluating limits before moving on to the harder 0/0 cases.",
      reviewedByAdmin: true,
    },
  });

  console.log("Math G12 Unit 2 Lesson 1, Limits content: OK - 1 sub-lesson, 3 questions, 1 video placeholder (needs review).");
}
