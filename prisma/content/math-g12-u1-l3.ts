import { QuestionSource } from "@prisma/client";

export async function seedMathG12Unit1Lesson3(prisma) {
  const math = await prisma.subject.upsert({
    where: { id: "math-natural" },
    update: {},
    create: { id: "math-natural", name: "Mathematics", stream: "NATURAL", order: 1 },
  });

  const unit1 = await prisma.unit.upsert({
    where: { id: "math-g12-u1" },
    update: {},
    create: { id: "math-g12-u1", subjectId: math.id, gradeLevel: 12, order: 1, title: "Sequences and Series", conceptTags: ["sequences", "sigma_notation"] },
  });

  const lesson3 = await prisma.lesson.upsert({
    where: { id: "math-g12-u1-l3" },
    update: {
      learningObjectives: [
        "Read and interpret sigma notation, identifying the starting index, ending index, and general term",
        "Expand a sum written in sigma notation into its individual terms",
        "Evaluate a finite sum expressed in sigma notation",
        "Apply the arithmetic series shortcut formula to sums of arithmetic sequences",
      ],
      summaryMd: "Sigma notation is shorthand for writing a sum of many terms, using a starting index, ending index, and a general term expression. Expanding a sigma sum means substituting each index value in turn and adding the results. For arithmetic sequences specifically, a shortcut formula S_k = k/2 * (a_1 + a_k) avoids adding every term individually. This lesson connects the general term idea from Lesson 1 and the arithmetic/geometric patterns from Lesson 2 into a tool for summing them, setting up Infinite Series in the next lesson.",
      additionalExamplesMd: "Extra Example 1: Expand sum from n=1 to 3 of (n^2). Answer: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.\n\nExtra Example 2: Use the arithmetic series shortcut to find the sum of the first 10 terms of the sequence 3, 7, 11, 15... (a_1=3, d=4). First find a_10 = 3 + 9(4) = 39. Then S_10 = 10/2 * (3+39) = 5*42 = 210.\n\nExtra Example 3: Does sum from n=0 to 4 of (2n+1) start at n=0 or n=1? Answer: this sum explicitly starts at n=0, so terms are (2(0)+1), (2(1)+1), (2(2)+1), (2(3)+1), (2(4)+1) = 1,3,5,7,9, summing to 25. Always check the starting index stated below sigma rather than assuming it starts at 1.",
    },
    create: {
      id: "math-g12-u1-l3", unitId: unit1.id, order: 3, title: "Sigma Notation", difficultyTier: 2,
      learningObjectives: [
        "Read and interpret sigma notation, identifying the starting index, ending index, and general term",
        "Expand a sum written in sigma notation into its individual terms",
        "Evaluate a finite sum expressed in sigma notation",
        "Apply the arithmetic series shortcut formula to sums of arithmetic sequences",
      ],
      summaryMd: "Sigma notation is shorthand for writing a sum of many terms, using a starting index, ending index, and a general term expression. Expanding a sigma sum means substituting each index value in turn and adding the results. For arithmetic sequences specifically, a shortcut formula S_k = k/2 * (a_1 + a_k) avoids adding every term individually. This lesson connects the general term idea from Lesson 1 and the arithmetic/geometric patterns from Lesson 2 into a tool for summing them, setting up Infinite Series in the next lesson.",
      additionalExamplesMd: "Extra Example 1: Expand sum from n=1 to 3 of (n^2). Answer: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.\n\nExtra Example 2: Use the arithmetic series shortcut to find the sum of the first 10 terms of the sequence 3, 7, 11, 15... (a_1=3, d=4). First find a_10 = 3 + 9(4) = 39. Then S_10 = 10/2 * (3+39) = 5*42 = 210.\n\nExtra Example 3: Does sum from n=0 to 4 of (2n+1) start at n=0 or n=1? Answer: this sum explicitly starts at n=0, so terms are (2(0)+1), (2(1)+1), (2(2)+1), (2(3)+1), (2(4)+1) = 1,3,5,7,9, summing to 25. Always check the starting index stated below sigma rather than assuming it starts at 1.",
    },
  });

  console.log("Math G12 Unit 1 Lesson 3 shell created (objectives, summary, additional examples).");
}

export async function seedMathG12Unit1Lesson3Content(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson3 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l3" } });

  const s3 = await prisma.subLesson.upsert({
    where: { id: "math-g12-u1-l3-s1" },
    update: {},
    create: {
      id: "math-g12-u1-l3-s1", lessonId: lesson3.id, order: 1, title: "Writing and Evaluating Sums with Sigma Notation",
      contentMd: "You now know how to describe sequences and generate individual terms. The next natural question is: what if we want to add up many terms at once? Writing out a long sum term by term is tedious, so mathematics uses a shorthand called sigma notation.\n\nThe Greek capital letter sigma means sum of. The notation sum from n=1 to 5 of a_n means: add up a_1 + a_2 + a_3 + a_4 + a_5. The number below sigma is the starting index, the number above is the ending index, and the expression to the right is the general term being summed.\n\nWorked Example: sum from n=1 to 4 of (2n) means (2*1) + (2*2) + (2*3) + (2*4) = 2 + 4 + 6 + 8 = 20.\n\nThis connects directly to arithmetic sequences from Lesson 2: if a_n is an arithmetic sequence, sum from n=1 to k of a_n is called an arithmetic series, and there is a shortcut formula: S_k = k/2 * (a_1 + a_k), the number of terms times the average of the first and last term. This avoids adding every term individually.\n\nProperties that make sigma notation practical: a constant multiplying every term can be factored out front of the sum, and the sum of two sequences added term-by-term equals the sum of summing each sequence separately.",
      commonMistakesMd: "Forgetting that the starting index isn't always 1, always check the number written below sigma; applying the arithmetic series shortcut formula to a sequence that isn't actually arithmetic.",
    },
  });

  const questions = [
    {
      id: "math-g12-u1-l3-q1", difficulty: 2,
      stem: "What is the value of the sum from n=1 to 4 of (3n - 1)?",
      options: [{ id: "A", text: "20" }, { id: "B", text: "26" }, { id: "C", text: "24" }, { id: "D", text: "30" }],
      correctOptionId: "B",
      explanationCorrect: "Expand term by term: n=1 gives 2, n=2 gives 5, n=3 gives 8, n=4 gives 11. Sum: 2+5+8+11 = 26.",
      explanationsWrong: { A: "Likely missed one term or made an arithmetic slip while adding.", C: "Doesn't match the correctly expanded sum of these four terms.", D: "An overcount, possibly adding an extra term or miscalculating one term's value." },
      commonMistakes: "Making an arithmetic error while expanding and adding the individual terms.",
      hints: ["Write out all four terms individually first: substitute n=1, then n=2, then n=3, then n=4 into 3n-1.", "Add the four resulting numbers carefully, one pair at a time."],
    },
    {
      id: "math-g12-u1-l3-q2", difficulty: 2,
      stem: "What is the value of the sum from n=1 to 5 of (2n)?",
      options: [{ id: "A", text: "20" }, { id: "B", text: "30" }, { id: "C", text: "25" }, { id: "D", text: "15" }],
      correctOptionId: "B",
      explanationCorrect: "Expand: 2+4+6+8+10 = 30.",
      explanationsWrong: { A: "Likely stopped the sum one term too early.", C: "Does not match the correctly expanded sum of the five terms.", D: "This is the sum 1+2+3+4+5 without doubling each term." },
      commonMistakes: "Forgetting to actually multiply each n by 2 before summing, or missing a term.",
      hints: ["Write out all five terms first, doubling each position number.", "2, 4, 6, 8, 10, now add them."],
    },
    {
      id: "math-g12-u1-l3-q3", difficulty: 3,
      stem: "Using the arithmetic series shortcut formula, find the sum of the first 6 terms of the sequence 4, 9, 14, 19... (a_1=4, d=5).",
      options: [{ id: "A", text: "84" }, { id: "B", text: "87" }, { id: "C", text: "114" }, { id: "D", text: "99" }],
      correctOptionId: "D",
      explanationCorrect: "First find a_6 = 4 + 5(5) = 29. Then S_6 = 6/2 * (4+29) = 3 * 33 = 99.",
      explanationsWrong: { A: "Does not correctly compute a_6 or apply the shortcut formula.", B: "A plausible but incorrect intermediate calculation.", C: "Likely used the wrong number of terms or an incorrect a_6 value." },
      commonMistakes: "Miscalculating a_6 using the general term formula before applying the sum shortcut, both steps must be correct.",
      hints: ["First find a_6 using a_n = a_1 + (n-1)d.", "Then apply S_k = k/2 times (a_1 + a_k) using k=6."],
    },
    {
      id: "math-g12-u1-l3-q4", difficulty: 3,
      stem: "Does the sum from n=0 to 3 of (n+2) include a term for n=0?",
      options: [{ id: "A", text: "Yes, and that term equals 2" }, { id: "B", text: "No, sums always start at n=1" }, { id: "C", text: "Yes, and that term equals 0" }, { id: "D", text: "No, n=0 is skipped automatically" }],
      correctOptionId: "A",
      explanationCorrect: "The starting index is explicitly written as n=0, so the first term uses n=0: (0+2) = 2. This term is included in the sum.",
      explanationsWrong: { B: "Sums do not always start at n=1, the starting index is whatever is written below sigma, in this case 0.", C: "Miscalculates the term value at n=0, forgetting to add the +2.", D: "There is no rule that skips n=0, the stated starting index is always included." },
      commonMistakes: "Assuming sigma sums always start at n=1 by default, without checking the actual starting index written in the notation.",
      hints: ["Always read the number directly below sigma, that is the actual starting index, whatever it is.", "Substitute n=0 into the expression (n+2) to find the first term."],
    },
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id, subjectId: math.id, subLessonId: s3.id,
        conceptTags: ["sigma_notation"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  await prisma.videoRecommendation.upsert({
    where: { id: "math-g12-u1-l3-v1" },
    update: {},
    create: {
      id: "math-g12-u1-l3-v1", lessonId: lesson3.id,
      youtubeUrl: "https://www.youtube.com/results?search_query=sigma+notation+summation+basic+introduction",
      title: "Sigma Notation (search results - needs manual review)",
      reasonMd: "Search-results placeholder, not yet verified against this specific lesson's content. Needs manual review before marking reviewedByAdmin true.",
      reviewedByAdmin: false,
    },
  });

  console.log("Math G12 Unit 1 Lesson 3, Sigma Notation content: OK - 1 sub-lesson, 4 questions, 1 video placeholder (needs review).");
}

export async function seedMathG12Unit1Lesson3GeometricSum(prisma) {
  const math = await prisma.subject.findUnique({ where: { id: "math-natural" } });
  const lesson3 = await prisma.lesson.findUnique({ where: { id: "math-g12-u1-l3" } });

  const s3b = await prisma.subLesson.upsert({
    where: { id: "math-g12-u1-l3-s2" },
    update: {},
    create: {
      id: "math-g12-u1-l3-s2", lessonId: lesson3.id, order: 2, title: "Sum of a Finite Geometric Series",
      contentMd: "You've already learned the arithmetic series shortcut in the previous section. Geometric sequences from Lesson 2 have their own sum formula, derived using a clever algebraic trick.\n\nIf a geometric sequence has first term G1 and common ratio r, the sum of its first n terms is: S_n = G1(1 - r^n) / (1 - r), valid whenever r is not equal to 1.\n\nWhere this formula comes from: write out S_n = G1 + G1*r + G1*r^2 + ... + G1*r^(n-1). Multiply every term by r to get r*S_n = G1*r + G1*r^2 + ... + G1*r^n. Subtracting these two equations, almost every term cancels, leaving (1-r)*S_n = G1(1 - r^n), which rearranges into the formula above.\n\nWorked Example: find the sum of the first 5 terms of a geometric sequence with G1=2, r=2. S_5 = 2*(1-2^5)/(1-2) = 2*(1-32)/(-1) = 2*(-31)/(-1) = 62.\n\nWorked Example 2: find the sum of the first 4 terms where G1=1, r=2/3. S_4 = 1*(1-(2/3)^4)/(1-2/3) = (1 - 16/81)/(1/3) = (65/81) * 3 = 65/27.\n\nThis is different from the infinite series formula in the next lesson: this formula works for any finite number of terms n, and any r except r=1, while the infinite version only works when |r| is strictly less than 1.",
      commonMistakesMd: "Confusing this finite-sum formula with the infinite-series formula from the next lesson, they look similar but apply to different situations; forgetting the formula is undefined when r=1 (since you'd divide by zero), a constant sequence needs to be summed by direct multiplication instead: S_n = n*G1.",
    },
  });

  const questions = [
    {
      id: "math-g12-u1-l3-q2", difficulty: 2,
      stem: "Find the sum of the first 4 terms of a geometric sequence with G1=3 and r=2.",
      options: [{ id: "A", text: "45" }, { id: "B", text: "48" }, { id: "C", text: "24" }, { id: "D", text: "36" }],
      correctOptionId: "A",
      explanationCorrect: "S_4 = 3*(1-2^4)/(1-2) = 3*(1-16)/(-1) = 3*(-15)/(-1) = 45.",
      explanationsWrong: { B: "An arithmetic error in applying the formula.", C: "This is just the 4th term times something, not the actual sum formula result.", D: "Does not match the correctly applied formula." },
      commonMistakes: "Sign errors when the numerator and denominator are both negative, remember two negatives divide to a positive.",
      hints: ["Substitute G1=3, r=2, n=4 into S_n = G1(1-r^n)/(1-r).", "2^4 = 16; work through the negative signs carefully."],
    },
    {
      id: "math-g12-u1-l3-q3", difficulty: 2,
      stem: "Which formula correctly gives the sum of the first n terms of a geometric sequence (r not equal to 1)?",
      options: [
        { id: "A", text: "S_n = G1(1-r^n)/(1-r)" },
        { id: "B", text: "S_n = n/2 * (G1 + G_n)" },
        { id: "C", text: "S_n = G1 + (n-1)r" },
        { id: "D", text: "S_n = G1 * r^(n-1)" },
      ],
      correctOptionId: "A",
      explanationCorrect: "This is the correct finite geometric series sum formula, derived by the subtraction method shown in this lesson.",
      explanationsWrong: { B: "This is actually the arithmetic series sum formula, not geometric.", C: "This resembles the arithmetic sequence general term formula, not a sum formula at all.", D: "This is the geometric sequence general term formula (for a single term), not the sum of many terms." },
      commonMistakes: "Confusing the geometric sum formula with the arithmetic sum formula, or with the general term formulas from earlier lessons.",
      hints: ["The arithmetic sum formula averages the first and last term; this one doesn't do that.", "This formula specifically involves r raised to the power n."],
    },
    {
      id: "math-g12-u1-l3-q4", difficulty: 3,
      stem: "A geometric sequence has G1=5 and r=3. How many terms are needed for the sum to first exceed 600?",
      options: [{ id: "A", text: "5 terms" }, { id: "B", text: "6 terms" }, { id: "C", text: "4 terms" }, { id: "D", text: "7 terms" }],
      correctOptionId: "A",
      explanationCorrect: "S_n = 5(1-3^n)/(1-3) = 5(3^n-1)/2. Testing n=5: S_5 = 5(243-1)/2 = 5(242)/2 = 605, which exceeds 600. Testing n=4: S_4=5(81-1)/2=200, not yet over 600. So 5 terms are needed.",
      explanationsWrong: { B: "6 terms would also exceed 600, but 5 is already sufficient, the question asks for the first n that works.", C: "S_4=200 does not yet exceed 600.", D: "Overshoots; fewer terms already suffice." },
      commonMistakes: "Not checking the boundary case (n and n-1) carefully to find the exact first n that satisfies the condition.",
      hints: ["Compute S_n for increasing values of n until you find one exceeding 600.", "Check n=4 first, then n=5, to find the transition point."],
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
        id: q.id, subjectId: math.id, subLessonId: s3b.id,
        conceptTags: ["geometric_sequence", "finite_geometric_series"], difficulty: q.difficulty, source: QuestionSource.ORIGINAL,
        stem: q.stem, options: q.options, correctOptionId: q.correctOptionId,
        explanationCorrect: q.explanationCorrect, explanationsWrong: q.explanationsWrong,
        commonMistakes: q.commonMistakes, hints: q.hints,
      },
    });
  }

  console.log("Math G12 Unit 1 Lesson 3, Sum of Finite Geometric Series (missing content, now added): OK - 1 sub-lesson, 3 questions.");
}
