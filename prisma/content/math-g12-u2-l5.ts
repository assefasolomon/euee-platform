import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit2Lesson5(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit2 = await prisma.unit.upsert({
    where: { id: "math-g12-u2" },
    update: {},
    create: { id: "math-g12-u2", subjectId: math.id, gradeLevel: 12, order: 2, title: "Introduction to Calculus", conceptTags: ["derivatives", "increasing_decreasing", "maxima_minima"] },
  });

  const lesson5 = await prisma.lesson.upsert({
    where: { id: "math-g12-u2-l5" },
    update: {
      learningObjectives: [
        "Determine intervals where a function is increasing or decreasing using the sign of its derivative",
        "Find critical points by solving f'(x) = 0",
        "Classify a critical point as a local maximum, local minimum, or neither",
      ],
      summaryMd: "A function is increasing where f'(x) > 0 and decreasing where f'(x) < 0, since the derivative's sign directly reflects rising or falling behavior, as established in the rates-of-change lesson. Critical points occur where f'(x) = 0 (or is undefined), and are the only candidates for local maxima or minima. Classify a critical point by checking the derivative's sign just before and after it: positive-to-negative means a local maximum, negative-to-positive means a local minimum, no sign change means neither.",
      additionalExamplesMd: "Extra Example 1: For f(x) = x^2 - 4x, find where it's increasing. f'(x) = 2x - 4. Set f'(x) > 0: 2x-4>0, x>2. So f is increasing for x>2.\n\nExtra Example 2: For f(x) = x^3 - 3x, find and classify critical points. f'(x) = 3x^2-3 = 3(x^2-1) = 3(x-1)(x+1). Setting f'(x)=0 gives x=1 and x=-1. Testing signs: f' is positive before x=-1, negative between -1 and 1, positive after x=1. So x=-1 is a local max, x=1 is a local min.\n\nExtra Example 3: A company's profit is P(x) = -2x^2 + 40x - 50 (x = units sold, hundreds). Find the number of units that maximizes profit. P'(x) = -4x+40. Set to 0: x=10. Since P' is positive before x=10 and negative after, this is a maximum, so selling 1000 units maximizes profit.",
    },
    create: {
      id: "math-g12-u2-l5", unitId: unit2.id, order: 5, title: "Increasing/Decreasing Functions and Maxima/Minima", difficultyTier: 3,
      learningObjectives: [
        "Determine intervals where a function is increasing or decreasing using the sign of its derivative",
        "Find critical points by solving f'(x) = 0",
        "Classify a critical point as a local maximum, local minimum, or neither",
      ],
      summaryMd: "A function is increasing where f'(x) > 0 and decreasing where f'(x) < 0, since the derivative's sign directly reflects rising or falling behavior, as established in the rates-of-change lesson. Critical points occur where f'(x) = 0 (or is undefined), and are the only candidates for local maxima or minima. Classify a critical point by checking the derivative's sign just before and after it: positive-to-negative means a local maximum, negative-to-positive means a local minimum, no sign change means neither.",
      additionalExamplesMd: "Extra Example 1: For f(x) = x^2 - 4x, find where it's increasing. f'(x) = 2x - 4. Set f'(x) > 0: 2x-4>0, x>2. So f is increasing for x>2.\n\nExtra Example 2: For f(x) = x^3 - 3x, find and classify critical points. f'(x) = 3x^2-3 = 3(x^2-1) = 3(x-1)(x+1). Setting f'(x)=0 gives x=1 and x=-1. Testing signs: f' is positive before x=-1, negative between -1 and 1, positive after x=1. So x=-1 is a local max, x=1 is a local min.\n\nExtra Example 3: A company's profit is P(x) = -2x^2 + 40x - 50 (x = units sold, hundreds). Find the number of units that maximizes profit. P'(x) = -4x+40. Set to 0: x=10. Since P' is positive before x=10 and negative after, this is a maximum, so selling 1000 units maximizes profit.",
    },
  });

  console.log("Math G12 Unit 2 Lesson 5 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit2Lesson5Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson5 = await prisma.lesson.findUnique({ where: { id: "math-g12-u2-l5" } });

  const s5a = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l5-s1" },
    update: {},
    create: {
      id: "math-g12-u2-l5-s1", lessonId: lesson5.id, order: 1, title: "Increasing and Decreasing Functions",
      contentMd: "In the last lesson, you learned that the sign of a derivative tells you the direction of change: positive means rising, negative means falling. This same idea, applied to any function's graph, tells you exactly where that function is increasing or decreasing.\n\nA function f is increasing on an interval where f'(x) > 0 throughout that interval, and decreasing where f'(x) < 0.\n\nWorked Example: for f(x) = x^2 - 4x, find where it is increasing and decreasing. First differentiate: f'(x) = 2x - 4. To find where f is increasing, solve f'(x) > 0: 2x - 4 > 0, so 2x > 4, so x > 2. So f is increasing for all x > 2, and by the same logic, decreasing for x < 2.\n\nThis matches the shape of a parabola: x^2-4x opens upward with its lowest point at x=2 (found by completing the square or symmetry), falling before that point and rising after it, exactly what the derivative analysis predicts.",
      commonMistakesMd: "Forgetting to solve the inequality f'(x) > 0 for x, and instead just looking at the sign of f'(x) at a single arbitrary point without properly finding the boundary; confusing where the original function f is positive/negative with where its derivative f' is positive/negative, these are different questions entirely.",
    },
  });

  const s5b = await prisma.subLesson.upsert({
    where: { id: "math-g12-u2-l5-s2" },
    update: {},
    create: {
      id: "math-g12-u2-l5-s2", lessonId: lesson5.id, order: 2, title: "Critical Points and Classifying Maxima/Minima",
      contentMd: "A function switches from increasing to decreasing (or vice versa) at specific points called critical points, exactly where f'(x) = 0 (or occasionally where the derivative doesn't exist, though we'll focus on the f'(x)=0 case here).\n\nTo find and classify critical points: first solve f'(x) = 0 to find candidate x-values. Then check the sign of f' just before and just after each candidate.\n\nWorked Example: for f(x) = x^3 - 3x, find and classify all critical points. Differentiate: f'(x) = 3x^2 - 3. Set equal to 0: 3x^2-3=0, so x^2=1, so x=1 or x=-1.\n\nTest x=-1: pick a value just before it, like x=-2: f'(-2)=3(4)-3=9, positive. Pick a value just after, like x=0: f'(0)=3(0)-3=-3, negative. Positive-to-negative means x=-1 is a local maximum.\n\nTest x=1: just before, x=0 gives f'(0)=-3, negative. Just after, x=2 gives f'(2)=3(4)-3=9, positive. Negative-to-positive means x=1 is a local minimum.\n\nThis sign-testing method, called the first derivative test, works for any differentiable function, and is exactly how you would find, for example, the production level that maximizes a company's profit, or the time that minimizes a rocket's altitude loss.",
      commonMistakesMd: "Forgetting to actually test the sign change, and instead assuming every critical point is automatically a maximum or minimum (some are neither, called saddle points/inflection points, where the sign doesn't change); mixing up which direction (positive-to-negative vs negative-to-positive) corresponds to a maximum versus a minimum.",
    },
  });

  const questions = [
    {
      id: "math-g12-u2-l5-q1", subLessonId: s5a.id, difficulty: 3,
      stem: "For f(x) = x^2 - 6x, for which values of x is f increasing?",
      options: [{ id: "A", text: "x > 3" }, { id: "B", text: "x < 3" }, { id: "C", text: "x > 6" }, { id: "D", text: "All x" }],
      correctOptionId: "A",
      explanationCorrect: "f'(x) = 2x - 6. Set f'(x) > 0: 2x-6>0, 2x>6, x>3. So f is increasing for x>3.",
      explanationsWrong: { B: "This is where f is actually decreasing, the opposite interval.", C: "Does not match the correctly solved inequality.", D: "A parabola cannot be increasing everywhere, it has both a rising and falling portion." },
      commonMistakes: "Solving the inequality direction backward, or forgetting to divide correctly to isolate x.",
      hints: ["Differentiate first, then set the derivative greater than zero and solve for x.", "2x - 6 > 0, add 6 to both sides, then divide by 2."],
    },
    {
      id: "math-g12-u2-l5-q2", subLessonId: s5a.id, difficulty: 2,
      stem: "If f'(x) < 0 on an interval, what does this tell you about f on that interval?",
      options: [{ id: "A", text: "f is increasing" }, { id: "B", text: "f is decreasing" }, { id: "C", text: "f has a maximum there" }, { id: "D", text: "f is undefined there" }],
      correctOptionId: "B",
      explanationCorrect: "A negative derivative means the function's rate of change is negative, meaning f is decreasing on that interval.",
      explanationsWrong: { A: "This describes a positive derivative, the opposite sign.", C: "A maximum occurs at a critical point (f'=0), not throughout an interval where f' is negative.", D: "The derivative being negative says nothing about whether f itself is defined." },
      commonMistakes: "Mixing up which sign of the derivative corresponds to increasing versus decreasing behavior.",
      hints: ["Recall: positive derivative means rising, negative derivative means falling.", "This is the same sign-interpretation idea from the rates-of-change lesson."],
    },
    {
      id: "math-g12-u2-l5-q3", subLessonId: s5b.id, difficulty: 3,
      stem: "For f(x) = x^2 - 4x + 1, find and classify the critical point.",
      options: [{ id: "A", text: "x=2, a local minimum" }, { id: "B", text: "x=2, a local maximum" }, { id: "C", text: "x=4, a local minimum" }, { id: "D", text: "x=-2, a local maximum" }],
      correctOptionId: "A",
      explanationCorrect: "f'(x) = 2x-4. Set to 0: x=2. Testing: f'(1)=2(1)-4=-2 (negative), f'(3)=2(3)-4=2 (positive). Negative-to-positive means x=2 is a local minimum.",
      explanationsWrong: { B: "Correctly finds x=2 but misclassifies it; the sign change is negative-to-positive, which is a minimum, not a maximum.", C: "Incorrectly solves f'(x)=0.", D: "Neither the critical point location nor the classification is correct." },
      commonMistakes: "Correctly finding the critical point but then misremembering which sign-change pattern indicates a maximum versus a minimum.",
      hints: ["First solve f'(x)=0 to find the critical x-value.", "Then test a value just below and just above that x-value to see the sign change direction."],
    },
    {
      id: "math-g12-u2-l5-q4", subLessonId: s5b.id, difficulty: 3,
      stem: "A farmer's crop yield is Y(x) = -3x^2 + 24x (x = kg of fertilizer per plant). What amount of fertilizer maximizes yield?",
      options: [{ id: "A", text: "x = 4 kg" }, { id: "B", text: "x = 8 kg" }, { id: "C", text: "x = 24 kg" }, { id: "D", text: "x = 3 kg" }],
      correctOptionId: "A",
      explanationCorrect: "Y'(x) = -6x+24. Set to 0: -6x+24=0, x=4. Testing: Y'(3)=-6(3)+24=6 (positive), Y'(5)=-6(5)+24=-6 (negative). Positive-to-negative confirms x=4 is a maximum.",
      explanationsWrong: { B: "Does not solve the critical point equation correctly.", C: "This is one of the coefficients from the original function, not the actual critical point.", D: "An incorrect value that does not satisfy Y'(x)=0." },
      commonMistakes: "Errors solving the linear equation Y'(x)=0 for x, or skipping the classification step and assuming any critical point is automatically the maximum.",
      hints: ["Differentiate Y(x), set the result equal to 0, and solve for x.", "Verify it's a maximum, not a minimum, by checking the sign change."],
    },
  ];

  const subLessonMap = { s5a: s5a.id, s5b: s5b.id };

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
        conceptTags: ["increasing_decreasing", "maxima_minima"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  await prisma.videoRecommendation.upsert({
    where: { id: "math-g12-u2-l5-v1" },
    update: {},
    create: {
      id: "math-g12-u2-l5-v1", lessonId: lesson5.id,
      youtubeUrl: "https://www.youtube.com/watch?v=Mx974cEs24Q",
      title: "Calculus 1 - Introduction to Limits and Derivative Applications",
      reasonMd: "Confirmed Organic Chemistry Tutor calculus review video covering derivative applications including increasing/decreasing intervals and critical points, reinforcing the sign-testing method taught in this lesson.",
      reviewedByAdmin: true,
    },
  });

  console.log("Math G12 Unit 2 Lesson 5, Increasing/Decreasing and Maxima/Minima content: OK - 2 sub-lessons, 4 questions, 1 video.");
}
