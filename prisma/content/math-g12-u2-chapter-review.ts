import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit2ChapterReviewPart1(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const unit2 = await prisma.unit.findUnique({ where: { id: "math-g12-u2" } });

  const exam = await prisma.chapterExam.upsert({
    where: { id: "math-g12-u2-review" },
    update: {},
    create: { id: "math-g12-u2-review", unitId: unit2.id, targetQuestionCount: 100 },
  });

  const questions = [
    {
      id: "math-g12-u2-review-q1", order: 1, difficulty: 2, tags: ["limits"],
      stem: "What is lim(x to 4) of (x^2 - 16)/(x - 4)?",
      options: [{ id: "A", text: "0" }, { id: "B", text: "8" }, { id: "C", text: "4" }, { id: "D", text: "Undefined" }],
      correctOptionId: "B",
      explanationCorrect: "Factor: (x-4)(x+4)/(x-4), cancel, leaving x+4. Substitute x=4: 4+4=8.",
      explanationsWrong: { A: "Does not correctly apply the factoring and cancellation.", C: "This is the x-value itself, not the evaluated limit.", D: "The 0/0 form is a signal to factor, not that no limit exists." },
      commonMistakes: "Stopping after getting 0/0 instead of factoring first.",
      hints: ["Direct substitution gives 0/0; factor the numerator as a difference of squares.", "After canceling, substitute x=4 into what remains."],
    },
    {
      id: "math-g12-u2-review-q2", order: 2, difficulty: 1, tags: ["limits"],
      stem: "What is lim(x to 0) of (3x + 7)?",
      options: [{ id: "A", text: "0" }, { id: "B", text: "3" }, { id: "C", text: "7" }, { id: "D", text: "10" }],
      correctOptionId: "C",
      explanationCorrect: "No issue with direct substitution: 3(0)+7 = 7.",
      explanationsWrong: { A: "Incorrect substitution result.", B: "This is just the coefficient, not the evaluated expression.", D: "Not the correct result of substituting x=0." },
      commonMistakes: "Overcomplicating a limit that just needs direct substitution.",
      hints: ["Check if direct substitution causes any problem first, like division by zero.", "If not, just substitute x=0 directly."],
    },
    {
      id: "math-g12-u2-review-q3", order: 3, difficulty: 2, tags: ["derivatives", "power_rule"],
      stem: "If f(x) = x^5, what is f'(x)?",
      options: [{ id: "A", text: "5x^4" }, { id: "B", text: "x^4" }, { id: "C", text: "5x^5" }, { id: "D", text: "4x^5" }],
      correctOptionId: "A",
      explanationCorrect: "Power rule: f'(x) = n*x^(n-1) with n=5: f'(x) = 5x^4.",
      explanationsWrong: { B: "Drops the coefficient 5.", C: "Forgets to reduce the exponent.", D: "Uses an incorrect exponent-reduction pattern." },
      commonMistakes: "Forgetting one of the two power-rule steps: bringing down the exponent, or reducing it by one.",
      hints: ["The exponent becomes a multiplying coefficient.", "Then the exponent itself drops by exactly one."],
    },
    {
      id: "math-g12-u2-review-q4", order: 4, difficulty: 2, tags: ["derivatives", "sum_rule"],
      stem: "If f(x) = 3x^2 - 5x + 2, what is f'(x)?",
      options: [{ id: "A", text: "6x - 5" }, { id: "B", text: "6x - 5x" }, { id: "C", text: "3x - 5" }, { id: "D", text: "6x + 2" }],
      correctOptionId: "A",
      explanationCorrect: "Differentiate each term: 3x^2 gives 6x; -5x gives -5; 2 (constant) gives 0. Sum: 6x - 5.",
      explanationsWrong: { B: "Fails to actually differentiate the -5x term, leaving x in place.", C: "Forgets to bring down the exponent from the first term correctly.", D: "Incorrectly keeps the constant term instead of it becoming 0." },
      commonMistakes: "Forgetting that a lone constant differentiates to 0, or not fully differentiating a linear term.",
      hints: ["Differentiate each of the three terms separately using the power rule.", "Remember: a constant's derivative is always 0."],
    },
    {
      id: "math-g12-u2-review-q5", order: 5, difficulty: 3, tags: ["product_rule"],
      stem: "Using the product rule, what is the derivative of f(x) = x^2 * (2x+1)?",
      options: [{ id: "A", text: "6x^2 + 2x" }, { id: "B", text: "2x + 2" }, { id: "C", text: "4x^2" }, { id: "D", text: "6x^2" }],
      correctOptionId: "A",
      explanationCorrect: "u=x^2 (u'=2x), v=(2x+1) (v'=2). f'(x) = 2x(2x+1) + x^2(2) = 4x^2+2x+2x^2 = 6x^2+2x.",
      explanationsWrong: { B: "Differentiates only one factor, ignoring the product rule structure.", C: "An incomplete application missing a term.", D: "Missing the linear term from the full expansion." },
      commonMistakes: "Forgetting one of the two terms in the product rule formula, or an arithmetic error combining like terms.",
      hints: ["Identify u=x^2 and v=(2x+1), find u' and v' separately.", "Apply f'(x) = u'v + uv', then combine like terms."],
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

  console.log("Math G12 Unit 2 Chapter Review Part 1: OK - 5 questions (Limits, Derivative, Product Rule).");
}

export async function seedMathG12Unit2ChapterReviewPart2(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const exam = await prisma.chapterExam.findUnique({ where: { id: "math-g12-u2-review" } });

  const questions = [
    {
      id: "math-g12-u2-review-q6", order: 6, difficulty: 3, tags: ["quotient_rule"],
      stem: "Using the quotient rule, what is the derivative of f(x) = (x-2)/(x+2)?",
      options: [{ id: "A", text: "4/(x+2)^2" }, { id: "B", text: "1" }, { id: "C", text: "-4/(x+2)^2" }, { id: "D", text: "2/(x+2)^2" }],
      correctOptionId: "A",
      explanationCorrect: "u=(x-2) (u'=1), v=(x+2) (v'=1). f'(x) = [1(x+2)-(x-2)(1)]/(x+2)^2 = [x+2-x+2]/(x+2)^2 = 4/(x+2)^2.",
      explanationsWrong: { B: "Does not correctly apply the quotient rule formula.", C: "Gets the sign wrong in the numerator.", D: "Does not match the correctly simplified numerator." },
      commonMistakes: "Sign errors in the numerator subtraction, especially when the original expression already has a minus sign.",
      hints: ["Identify u=(x-2) and v=(x+2), find u' and v'.", "Apply f'(x)=(u'v-uv')/v^2 carefully, watching signs."],
    },
    {
      id: "math-g12-u2-review-q7", order: 7, difficulty: 2, tags: ["quotient_rule"],
      stem: "Which situation requires the quotient rule to differentiate?",
      options: [{ id: "A", text: "f(x) = x^2 + 3x" }, { id: "B", text: "f(x) = x^2 * 3x" }, { id: "C", text: "f(x) = x^2 / 3x" }, { id: "D", text: "f(x) = 5" }],
      correctOptionId: "C",
      explanationCorrect: "This function is one expression divided by another, the exact situation the quotient rule handles.",
      explanationsWrong: { A: "This is a sum, needs only the sum rule.", B: "This is a product, needs the product rule, not the quotient rule.", D: "This is a constant, its derivative is just 0." },
      commonMistakes: "Confusing multiplication (needs product rule) with division (needs quotient rule).",
      hints: ["Look for a division sign specifically, not multiplication.", "A fraction with x in both parts needs the quotient rule."],
    },
    {
      id: "math-g12-u2-review-q8", order: 8, difficulty: 3, tags: ["tangent_lines"],
      stem: "Find the equation of the tangent line to f(x) = x^2 at x = -1.",
      options: [{ id: "A", text: "y = -2x - 1" }, { id: "B", text: "y = 2x + 1" }, { id: "C", text: "y = -2x + 1" }, { id: "D", text: "y = -x - 1" }],
      correctOptionId: "A",
      explanationCorrect: "f(-1)=1, point (-1,1). f'(x)=2x, f'(-1)=-2. Point-slope: y-1=-2(x-(-1))=-2(x+1), y-1=-2x-2, y=-2x-1.",
      explanationsWrong: { B: "Gets the sign of the slope wrong.", C: "A close but incorrect simplification.", D: "Uses an incorrect slope value entirely." },
      commonMistakes: "Sign errors when substituting a negative x-value into both the function and its derivative.",
      hints: ["Find the point first: f(-1). Then find the slope: f'(-1).", "Be careful with negative signs throughout the point-slope simplification."],
    },
    {
      id: "math-g12-u2-review-q9", order: 9, difficulty: 3, tags: ["rates_of_change"],
      stem: "A ball's height is h(t) = -5t^2 + 15t (meters). What is its velocity at t = 1 second?",
      options: [{ id: "A", text: "5 m/s" }, { id: "B", text: "10 m/s" }, { id: "C", text: "15 m/s" }, { id: "D", text: "-5 m/s" }],
      correctOptionId: "A",
      explanationCorrect: "h'(t) = -10t + 15. At t=1: h'(1) = -10+15 = 5 m/s.",
      explanationsWrong: { B: "Does not match the correctly evaluated derivative.", C: "This is a coefficient from the original function, not the derivative's value.", D: "Sign error in the calculation." },
      commonMistakes: "Computing h(1) instead of h'(1), or an arithmetic slip in the substitution.",
      hints: ["Velocity is the derivative of position, differentiate h(t) first.", "Then substitute t=1 into the derivative, not the original function."],
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

  console.log("Math G12 Unit 2 Chapter Review Part 2: OK - 4 questions (Quotient Rule, Tangent Lines, Rates of Change). Total bank now at 9 questions.");
}

export async function seedMathG12Unit2ChapterReviewPart3(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const exam = await prisma.chapterExam.findUnique({ where: { id: "math-g12-u2-review" } });

  const questions = [
    {
      id: "math-g12-u2-review-q10", order: 10, difficulty: 3, tags: ["increasing_decreasing"],
      stem: "For f(x) = x^2 - 8x, for which values of x is f decreasing?",
      options: [{ id: "A", text: "x < 4" }, { id: "B", text: "x > 4" }, { id: "C", text: "x < 8" }, { id: "D", text: "All x" }],
      correctOptionId: "A",
      explanationCorrect: "f'(x) = 2x - 8. Set f'(x) < 0: 2x-8<0, x<4. So f is decreasing for x<4.",
      explanationsWrong: { B: "This is where f is actually increasing.", C: "Does not match the correctly solved inequality.", D: "A parabola isn't decreasing everywhere." },
      commonMistakes: "Solving the inequality direction incorrectly.",
      hints: ["Differentiate first, then set the derivative less than zero.", "2x - 8 < 0, solve for x."],
    },
    {
      id: "math-g12-u2-review-q11", order: 11, difficulty: 3, tags: ["maxima_minima"],
      stem: "For f(x) = x^3 - 12x, find and classify the critical point at x=2.",
      options: [{ id: "A", text: "Local minimum" }, { id: "B", text: "Local maximum" }, { id: "C", text: "Neither" }, { id: "D", text: "Cannot be determined" }],
      correctOptionId: "A",
      explanationCorrect: "f'(x) = 3x^2-12. At x=2, f'(2)=0, confirming it's a critical point. Test: f'(1)=3-12=-9 (negative), f'(3)=27-12=15 (positive). Negative-to-positive means x=2 is a local minimum.",
      explanationsWrong: { B: "Misclassifies the sign-change pattern.", C: "The sign does change, so it is a genuine local extremum.", D: "This can absolutely be determined using the first derivative test." },
      commonMistakes: "Reversing which sign-change pattern indicates a maximum versus a minimum.",
      hints: ["Test the sign of f' just before and just after x=2.", "Negative-to-positive means a minimum; positive-to-negative means a maximum."],
    },
    {
      id: "math-g12-u2-review-q12", order: 12, difficulty: 3, tags: ["maxima_minima", "applications"],
      stem: "A store's revenue is R(x) = -x^2 + 50x (x = price increase in birr). What price increase maximizes revenue?",
      options: [{ id: "A", text: "x = 25 birr" }, { id: "B", text: "x = 50 birr" }, { id: "C", text: "x = 12.5 birr" }, { id: "D", text: "x = 0 birr" }],
      correctOptionId: "A",
      explanationCorrect: "R'(x) = -2x+50. Set to 0: x=25. Testing: R'(20)=10 (positive), R'(30)=-10 (negative). Positive-to-negative confirms x=25 is a maximum.",
      explanationsWrong: { B: "Does not solve R'(x)=0 correctly.", C: "An incorrect value not satisfying the critical point equation.", D: "This is not where the derivative equals zero." },
      commonMistakes: "Errors solving the linear critical-point equation, or skipping the sign-test classification step.",
      hints: ["Differentiate R(x), set equal to 0, solve for x.", "Verify with the sign test that this is a maximum, not a minimum."],
    },
    {
      id: "math-g12-u2-review-q13", order: 13, difficulty: 2, tags: ["derivatives"],
      stem: "What is the derivative of f(x) = 7 (a constant)?",
      options: [{ id: "A", text: "7" }, { id: "B", text: "0" }, { id: "C", text: "1" }, { id: "D", text: "x" }],
      correctOptionId: "B",
      explanationCorrect: "A constant function never changes, so its derivative is always 0.",
      explanationsWrong: { A: "This is the original value, not the derivative.", C: "There is no reason the derivative would be 1.", D: "Constants don't differentiate to x." },
      commonMistakes: "Forgetting the constant rule even after it's been covered in earlier lessons.",
      hints: ["Think about the graph of y=7, a flat horizontal line.", "What is the slope of a perfectly flat line?"],
    },
    {
      id: "math-g12-u2-review-q14", order: 14, difficulty: 2, tags: ["limits"],
      stem: "What is lim(x to 2) of (x^2 - x - 2)/(x - 2)?",
      options: [{ id: "A", text: "1" }, { id: "B", text: "2" }, { id: "C", text: "3" }, { id: "D", text: "Undefined" }],
      correctOptionId: "C",
      explanationCorrect: "Factor the numerator: x^2-x-2 = (x-2)(x+1). Cancel (x-2), leaving x+1. Substitute x=2: 2+1=3.",
      explanationsWrong: { A: "Does not match the correctly factored and evaluated expression.", B: "This is the x-value, not the result of evaluation.", D: "The 0/0 form is resolved by factoring, not evidence of no limit." },
      commonMistakes: "Incorrectly factoring the quadratic numerator.",
      hints: ["Factor x^2-x-2 into two binomials that multiply to give this expression.", "Look for factors of -2 that add to -1."],
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

  console.log("Math G12 Unit 2 Chapter Review Part 3: OK - 5 questions. Total bank now at 14 questions.");
}

export async function seedMathG12Unit2ChapterReviewPart4(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const exam = await prisma.chapterExam.findUnique({ where: { id: "math-g12-u2-review" } });

  const questions = [
    {
      id: "math-g12-u2-review-q15", order: 15, difficulty: 2, tags: ["derivatives", "power_rule"],
      stem: "If f(x) = x^(-3), what is f'(x)?",
      options: [{ id: "A", text: "-3x^(-4)" }, { id: "B", text: "-3x^(-2)" }, { id: "C", text: "3x^(-4)" }, { id: "D", text: "-4x^(-3)" }],
      correctOptionId: "A",
      explanationCorrect: "Power rule works for negative exponents too: f'(x) = -3*x^(-3-1) = -3x^(-4).",
      explanationsWrong: { B: "Incorrectly reduces the exponent, should subtract 1 from -3 to get -4.", C: "Loses the negative sign that should carry over.", D: "Makes the coefficient equal the wrong number." },
      commonMistakes: "Mishandling the arithmetic of subtracting 1 from a negative exponent.",
      hints: ["The power rule formula works identically for negative exponents.", "-3 minus 1 equals -4."],
    },
    {
      id: "math-g12-u2-review-q16", order: 16, difficulty: 3, tags: ["increasing_decreasing", "maxima_minima"],
      stem: "For f(x) = -x^2 + 6x, find the x-value where f reaches its maximum.",
      options: [{ id: "A", text: "x = 3" }, { id: "B", text: "x = 6" }, { id: "C", text: "x = -3" }, { id: "D", text: "x = 0" }],
      correctOptionId: "A",
      explanationCorrect: "f'(x) = -2x+6. Set to 0: x=3. Since the parabola opens downward (negative leading coefficient), this critical point is automatically a maximum.",
      explanationsWrong: { B: "Does not solve f'(x)=0 correctly.", C: "An incorrect sign in solving the equation.", D: "This is not where the derivative equals zero." },
      commonMistakes: "Sign errors when solving -2x+6=0 for x.",
      hints: ["Differentiate f(x), set the result to 0, solve for x.", "A downward-opening parabola's single critical point is always its maximum."],
    },
    {
      id: "math-g12-u2-review-q17", order: 17, difficulty: 2, tags: ["tangent_lines"],
      stem: "What two pieces of information do you need to write a tangent line's equation?",
      options: [
        { id: "A", text: "The function's domain and range" },
        { id: "B", text: "A point on the curve and the slope at that point" },
        { id: "C", text: "Two separate points on the curve" },
        { id: "D", text: "Only the slope, nothing else" },
      ],
      correctOptionId: "B",
      explanationCorrect: "Point-slope form requires exactly a point (x1, y1) and a slope m, the slope comes from evaluating the derivative at that point.",
      explanationsWrong: { A: "Domain and range don't directly give you a tangent line equation.", C: "Two points define a secant line, not necessarily a tangent line.", D: "A slope alone isn't enough, you also need a specific point to anchor the line." },
      commonMistakes: "Forgetting that both a point AND a slope are required, not just one or the other.",
      hints: ["Think about what point-slope form y-y1=m(x-x1) actually requires.", "You need both a specific (x,y) point and the value m."],
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

  console.log("Math G12 Unit 2 Chapter Review Part 4: OK - 3 questions. Total bank now at 17 questions.");
}

export async function seedMathG12Unit2ChapterReviewPart5(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const exam = await prisma.chapterExam.findUnique({ where: { id: "math-g12-u2-review" } });

  const questions = [
    {
      id: "math-g12-u2-review-q18", order: 18, difficulty: 2, tags: ["rates_of_change"],
      stem: "A tank's volume is V(t) = 80 - 4t liters. What does the sign of V'(t) tell you?",
      options: [
        { id: "A", text: "V'(t) is negative, meaning the tank is draining" },
        { id: "B", text: "V'(t) is positive, meaning the tank is filling" },
        { id: "C", text: "V'(t) is zero, meaning the volume never changes" },
        { id: "D", text: "The sign cannot be determined" },
      ],
      correctOptionId: "A",
      explanationCorrect: "V'(t) = -4, a constant negative value, meaning the volume decreases by 4 liters per unit time, the tank is draining.",
      explanationsWrong: { B: "The derivative here is negative, not positive.", C: "The derivative is a nonzero constant, -4, not zero.", D: "The derivative is easily computed directly from this linear function." },
      commonMistakes: "Not recognizing that a negative coefficient in a linear function directly gives a negative, constant rate of change.",
      hints: ["Differentiate V(t) = 80 - 4t.", "A negative rate of change means the quantity is decreasing."],
    },
    {
      id: "math-g12-u2-review-q19", order: 19, difficulty: 3, tags: ["maxima_minima"],
      stem: "For f(x) = x^3, is x=0 a local maximum, local minimum, or neither?",
      options: [{ id: "A", text: "Local maximum" }, { id: "B", text: "Local minimum" }, { id: "C", text: "Neither, no sign change" }, { id: "D", text: "Cannot be a critical point" }],
      correctOptionId: "C",
      explanationCorrect: "f'(x)=3x^2, which equals 0 at x=0, so it is a critical point. But f'(x)=3x^2 is non-negative everywhere (it's a square), so there's no sign change around x=0, meaning it's neither a max nor a min, just a flattening point.",
      explanationsWrong: { A: "There's no sign change from positive to negative here.", B: "There's no sign change from negative to positive here.", D: "x=0 is indeed a valid critical point, since f'(0)=0." },
      commonMistakes: "Assuming every critical point (where f'=0) must automatically be a maximum or minimum, without checking for an actual sign change.",
      hints: ["Check the sign of f'(x)=3x^2 just before and just after x=0.", "Since x^2 is never negative, does the sign actually change here?"],
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

  console.log("Math G12 Unit 2 Chapter Review Part 5: OK - 2 questions. Total bank now at 19 questions.");
}
