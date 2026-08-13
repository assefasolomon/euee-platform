import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit2Lesson4(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit2 = await prisma.unit.upsert({
    where: { id: "math-g12-u2" },
    update: {},
    create: { id: "math-g12-u2", subjectId: math.id, gradeLevel: 12, order: 2, title: "Introduction to Calculus", conceptTags: ["derivatives", "tangent_lines", "rates_of_change"] },
  });

  const lesson4 = await prisma.lesson.upsert({
    where: { id: "math-g12-u2-l4" },
    update: {
      learningObjectives: [
        "Find the equation of a tangent line to a curve at a given point",
        "Interpret a derivative as an instantaneous rate of change in a real-world context",
        "Solve applied problems involving velocity as the derivative of position",
      ],
      summaryMd: "The derivative gives the slope of a tangent line at any point on a curve. Combined with the point itself, you can write the tangent line's full equation using point-slope form: y - y1 = m(x - x1), where m is the derivative's value at that point. Beyond geometry, the derivative represents any instantaneous rate of change: velocity is the derivative of position, and similar interpretations apply to growth rates, cost rates, and more.",
      additionalExamplesMd: "Extra Example 1: Find the tangent line to f(x)=x^2 at x=3. f(3)=9, f'(x)=2x, f'(3)=6. Point-slope: y-9=6(x-3), simplifying to y=6x-9.\n\nExtra Example 2: A ball's height is h(t)=-5t^2+20t (t in seconds, h in meters). Find its velocity at t=1. h'(t)=-10t+20. h'(1)=-10+20=10 m/s (positive, so still rising).\n\nExtra Example 3: A tank's volume is V(t)=100-2t^2 liters. Find the rate at which the tank is draining at t=4 seconds. V'(t)=-4t. V'(4)=-16, meaning the volume is decreasing at 16 liters per second at that moment.",
    },
    create: {
      id: "math-g12-u2-l4", unitId: unit2.id, order: 4, title: "Applications: Tangent Lines and Rates of Change", difficultyTier: 3,
      learningObjectives: [
        "Find the equation of a tangent line to a curve at a given point",
        "Interpret a derivative as an instantaneous rate of change in a real-world context",
        "Solve applied problems involving velocity as the derivative of position",
      ],
      summaryMd: "The derivative gives the slope of a tangent line at any point on a curve. Combined with the point itself, you can write the tangent line's full equation using point-slope form: y - y1 = m(x - x1), where m is the derivative's value at that point. Beyond geometry, the derivative represents any instantaneous rate of change: velocity is the derivative of position, and similar interpretations apply to growth rates, cost rates, and more.",
      additionalExamplesMd: "Extra Example 1: Find the tangent line to f(x)=x^2 at x=3. f(3)=9, f'(x)=2x, f'(3)=6. Point-slope: y-9=6(x-3), simplifying to y=6x-9.\n\nExtra Example 2: A ball's height is h(t)=-5t^2+20t (t in seconds, h in meters). Find its velocity at t=1. h'(t)=-10t+20. h'(1)=-10+20=10 m/s (positive, so still rising).\n\nExtra Example 3: A tank's volume is V(t)=100-2t^2 liters. Find the rate at which the tank is draining at t=4 seconds. V'(t)=-4t. V'(4)=-16, meaning the volume is decreasing at 16 liters per second at that moment.",
    },
  });

  console.log("Math G12 Unit 2 Lesson 4 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit2Lesson4Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson4 = await prisma.lesson.findUnique({ where: { id: "math-g12-u2-l4" } });

  const s4a = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l4-s1" },
    update: {},
    create: {
      id: "math-g12-u2-l4-s1", lessonId: lesson4.id, order: 1, title: "Finding the Equation of a Tangent Line",
      contentMd: "Back in the Limits lesson, the derivative was introduced as the slope of a tangent line. Now that you can actually compute derivatives, you can find the full equation of that tangent line, not just its slope.\n\nTo find a tangent line's equation, you need two things: the slope (from the derivative) and a point (which you already have, since the tangent line touches the curve at a specific x-value). Once you have both, use point-slope form: y - y1 = m(x - x1), where m is the slope and (x1, y1) is the point.\n\nWorked Example: find the tangent line to f(x) = x^2 - 3 at x=2. First find the point: f(2) = 4-3 = 1, so the point is (2, 1). Next find the slope: f'(x) = 2x, so f'(2) = 4. Now apply point-slope form: y - 1 = 4(x - 2). Simplify: y - 1 = 4x - 8, so y = 4x - 7.\n\nThis three-step process, find the point, find the slope from the derivative, apply point-slope form, works for any function you can differentiate.",
      commonMistakesMd: "Confusing f(a) (the y-coordinate, a point on the original curve) with f'(a) (the slope of the tangent at that point), these are two completely different numbers computed from two different functions; forgetting to actually find the point before applying point-slope form.",
    },
  });

  const s4b = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l4-s2" },
    update: {},
    create: {
      id: "math-g12-u2-l4-s2", lessonId: lesson4.id, order: 2, title: "Rates of Change and Velocity",
      contentMd: "The derivative's most powerful real-world application is as an instantaneous rate of change, exactly what we previewed back in the Limits lesson with the speedometer example.\n\nIf s(t) gives an object's position at time t, then s'(t) gives its velocity, how fast position is changing at that instant. If v(t) is velocity, v'(t) gives acceleration, how fast velocity itself is changing. This same pattern applies far beyond physics: if a function describes a population, its derivative gives the population's growth rate; if a function describes cost, its derivative gives the marginal cost (the rate cost increases per additional unit).\n\nWorked Example: a rocket's height is h(t) = -5t^2 + 30t + 2 meters, t in seconds. Find its velocity at t=2 seconds. h'(t) = -10t + 30. h'(2) = -20+30 = 10 m/s, positive, meaning the rocket is still rising at that moment.\n\nThe sign of a rate of change carries real meaning: positive means increasing, negative means decreasing, zero means momentarily unchanging (often the peak or bottom of a curve, which the next lesson explores directly).",
      commonMistakesMd: "Reporting only the magnitude of a rate without its sign, the sign tells you the direction of change (rising vs falling), which is often the actual point of the question; confusing the original function's value (a position, a population size) with its derivative's value (a rate), these answer different questions.",
    },
  });

  const questions = [
    {
      id: "math-g12-u2-l4-q1", subLessonId: "s4a", difficulty: 3,
      stem: "Find the equation of the tangent line to f(x) = x^2 + 1 at x = 3.",
      options: [{ id: "A", text: "y = 6x - 8" }, { id: "B", text: "y = 6x + 1" }, { id: "C", text: "y = 3x - 8" }, { id: "D", text: "y = 6x - 9" }],
      correctOptionId: "A",
      explanationCorrect: "f(3)=9+1=10, point (3,10). f'(x)=2x, f'(3)=6. Point-slope: y-10=6(x-3), simplify: y-10=6x-18, so y=6x-8.",
      explanationsWrong: { B: "Uses the wrong y-intercept, likely a substitution error.", C: "Uses an incorrect slope value.", D: "A close but incorrect simplification of the point-slope equation." },
      commonMistakes: "Algebra errors when simplifying the point-slope form into slope-intercept form.",
      hints: ["First find the point (x, f(x)) at x=3, then find the slope f'(3).", "Apply y - y1 = m(x - x1), then carefully simplify."],
    },
    {
      id: "math-g12-u2-l4-q2", subLessonId: "s4a", difficulty: 2,
      stem: "For f(x) = x^3, what is the difference between f(2) and f'(2)?",
      options: [{ id: "A", text: "f(2)=8 is the point's height; f'(2)=12 is the tangent's slope" }, { id: "B", text: "They are the same value" }, { id: "C", text: "f(2) is the slope; f'(2) is the height" }, { id: "D", text: "Neither can be computed" }],
      correctOptionId: "A",
      explanationCorrect: "f(2) = 2^3 = 8, the y-coordinate on the curve. f'(x)=3x^2, so f'(2)=3(4)=12, the slope of the tangent line at that point. These are different quantities from different functions.",
      explanationsWrong: { B: "8 and 12 are clearly different numbers.", C: "Reverses which quantity represents the height versus the slope.", D: "Both are easily computable by direct substitution." },
      commonMistakes: "Confusing the original function's output (a height/position) with the derivative's output (a slope/rate) at the same x-value.",
      hints: ["f(2) uses the original function; f'(2) uses the derivative function, a different formula entirely.", "Compute each separately: 2^3 for one, 3x^2 evaluated at x=2 for the other."],
    },
    {
      id: "math-g12-u2-l4-q3", subLessonId: "s4b", difficulty: 3,
      stem: "A particle's position is s(t) = t^3 - 6t (meters, t in seconds). What is its velocity at t=2?",
      options: [{ id: "A", text: "6 m/s" }, { id: "B", text: "8 m/s" }, { id: "C", text: "2 m/s" }, { id: "D", text: "-4 m/s" }],
      correctOptionId: "A",
      explanationCorrect: "Velocity is the derivative of position: s'(t) = 3t^2 - 6. At t=2: s'(2) = 3(4)-6 = 12-6 = 6 m/s.",
      explanationsWrong: { B: "Does not match the correctly computed derivative at t=2.", C: "An arithmetic slip in evaluating the derivative.", D: "Incorrect sign or miscalculation of the derivative's value." },
      commonMistakes: "Computing s(2) instead of s'(2), evaluating the original position function instead of its derivative.",
      hints: ["Velocity requires the derivative of position, not the position itself.", "Differentiate s(t) first using the power rule, then substitute t=2."],
    },
    {
      id: "math-g12-u2-l4-q4", subLessonId: "s4b", difficulty: 2,
      stem: "A tank's water volume is given by V(t) = 50 - 3t liters. What does V'(t) represent, and what is its value?",
      options: [
        { id: "A", text: "The current volume; V'(t) = 50" },
        { id: "B", text: "The rate the volume is changing; V'(t) = -3 liters per unit time" },
        { id: "C", text: "The rate the volume is changing; V'(t) = 3 liters per unit time" },
        { id: "D", text: "The time remaining; V'(t) = 50-3t" },
      ],
      correctOptionId: "B",
      explanationCorrect: "V'(t) represents the rate of change of volume over time. Differentiating: V'(t) = -3, a constant negative rate, meaning the tank is draining at exactly 3 liters per unit of time.",
      explanationsWrong: { A: "This confuses the derivative with the original function's value.", C: "Gets the correct magnitude but drops the negative sign, which indicates draining rather than filling.", D: "This is just the original function restated, not its derivative." },
      commonMistakes: "Dropping the negative sign, which is the part of the answer that actually indicates the tank is draining rather than filling.",
      hints: ["The derivative of a linear function like 50-3t is just its constant coefficient.", "The sign of the rate tells you the direction: is the tank filling or draining?"],
    },
  ];

  const subLessonMap = { s4a: s4a.id, s4b: s4b.id };

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
        conceptTags: ["tangent_lines", "rates_of_change"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 2 Lesson 4, Applications content: OK - 2 sub-lessons, 4 questions.");
}

export async function seedMathG12Unit2Lesson4Questions(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const s4a = await prisma.subLesson.findUnique({ where: { id: "math-g12-u2-l4-s1" } });
  const s4b = await prisma.subLesson.findUnique({ where: { id: "math-g12-u2-l4-s2" } });
  const lesson4 = await prisma.lesson.findUnique({ where: { id: "math-g12-u2-l4" } });

  const questions = [
    {
      id: "math-g12-u2-l4-q1", subLessonId: s4a.id, difficulty: 3,
      stem: "Find the equation of the tangent line to f(x) = x^2 + 1 at x = 3.",
      options: [{ id: "A", text: "y = 6x - 8" }, { id: "B", text: "y = 6x + 1" }, { id: "C", text: "y = 3x - 8" }, { id: "D", text: "y = 6x - 9" }],
      correctOptionId: "A",
      explanationCorrect: "f(3)=9+1=10, point (3,10). f'(x)=2x, f'(3)=6. Point-slope: y-10=6(x-3), simplify: y-10=6x-18, so y=6x-8.",
      explanationsWrong: { B: "Uses the wrong y-intercept, likely a substitution error.", C: "Uses an incorrect slope value.", D: "A close but incorrect simplification of the point-slope equation." },
      commonMistakes: "Algebra errors when simplifying the point-slope form into slope-intercept form.",
      hints: ["First find the point (x, f(x)) at x=3, then find the slope f'(3).", "Apply y - y1 = m(x - x1), then carefully simplify."],
    },
    {
      id: "math-g12-u2-l4-q2", subLessonId: s4a.id, difficulty: 2,
      stem: "For f(x) = x^3, what is the difference between f(2) and f'(2)?",
      options: [{ id: "A", text: "f(2)=8 is the point's height; f'(2)=12 is the tangent's slope" }, { id: "B", text: "They are the same value" }, { id: "C", text: "f(2) is the slope; f'(2) is the height" }, { id: "D", text: "Neither can be computed" }],
      correctOptionId: "A",
      explanationCorrect: "f(2) = 2^3 = 8, the y-coordinate on the curve. f'(x)=3x^2, so f'(2)=3(4)=12, the slope of the tangent line at that point.",
      explanationsWrong: { B: "8 and 12 are clearly different numbers.", C: "Reverses which quantity represents the height versus the slope.", D: "Both are easily computable by direct substitution." },
      commonMistakes: "Confusing the original function's output with the derivative's output at the same x-value.",
      hints: ["f(2) uses the original function; f'(2) uses the derivative function.", "Compute each separately."],
    },
    {
      id: "math-g12-u2-l4-q3", subLessonId: s4b.id, difficulty: 3,
      stem: "A particle's position is s(t) = t^3 - 6t (meters, t in seconds). What is its velocity at t=2?",
      options: [{ id: "A", text: "6 m/s" }, { id: "B", text: "8 m/s" }, { id: "C", text: "2 m/s" }, { id: "D", text: "-4 m/s" }],
      correctOptionId: "A",
      explanationCorrect: "Velocity is the derivative of position: s'(t) = 3t^2 - 6. At t=2: s'(2) = 3(4)-6 = 12-6 = 6 m/s.",
      explanationsWrong: { B: "Does not match the correctly computed derivative at t=2.", C: "An arithmetic slip in evaluating the derivative.", D: "Incorrect sign or miscalculation of the derivative's value." },
      commonMistakes: "Computing s(2) instead of s'(2).",
      hints: ["Velocity requires the derivative of position, not the position itself.", "Differentiate s(t) first, then substitute t=2."],
    },
    {
      id: "math-g12-u2-l4-q4", subLessonId: s4b.id, difficulty: 2,
      stem: "A tank's water volume is given by V(t) = 50 - 3t liters. What does V'(t) represent, and what is its value?",
      options: [
        { id: "A", text: "The current volume; V'(t) = 50" },
        { id: "B", text: "The rate the volume is changing; V'(t) = -3 liters per unit time" },
        { id: "C", text: "The rate the volume is changing; V'(t) = 3 liters per unit time" },
        { id: "D", text: "The time remaining; V'(t) = 50-3t" },
      ],
      correctOptionId: "B",
      explanationCorrect: "V'(t) represents the rate of change of volume over time. Differentiating: V'(t) = -3, meaning the tank is draining at 3 liters per unit of time.",
      explanationsWrong: { A: "This confuses the derivative with the original function's value.", C: "Gets the correct magnitude but drops the negative sign.", D: "This is just the original function restated." },
      commonMistakes: "Dropping the negative sign, which indicates the tank is draining rather than filling.",
      hints: ["The derivative of a linear function like 50-3t is just its constant coefficient.", "The sign of the rate tells you the direction."],
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
        id: q.id, subjectId: math.id, subLessonId: q.subLessonId,
        conceptTags: ["tangent_lines", "rates_of_change"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  await prisma.videoRecommendation.upsert({
    where: { id: "math-g12-u2-l4-v1" },
    update: {},
    create: {
      id: "math-g12-u2-l4-v1", lessonId: lesson4.id,
      youtubeUrl: "https://www.youtube.com/watch?v=UOrS2qje2_o",
      title: "How To Find The Equation of a Tangent Line Using Derivatives",
      reasonMd: "Walks through the exact three-step process this lesson teaches: find the point, find the slope from the derivative, then apply point-slope form, with multiple worked examples reinforcing the technique.",
      reviewedByAdmin: true,
    },
  });

  console.log("Math G12 Unit 2 Lesson 4, questions and video: OK - 4 questions, 1 verified video.");
}
