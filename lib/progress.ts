import { ProgressStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function isLessonComplete(userId, lessonId) {
  const subLessons = await prisma.subLesson.findMany({
    where: { lessonId: lessonId },
    include: { knowledgeCheckQuestions: true },
  });

  const allQuestionIds = subLessons.flatMap(function(sl) {
    return sl.knowledgeCheckQuestions.map(function(q) { return q.id; });
  });

  if (allQuestionIds.length === 0) return true;

  const correctAttempts = await prisma.quizAttempt.findMany({
    where: { userId: userId, questionId: { in: allQuestionIds }, correct: true },
    distinct: ["questionId"],
  });

  return correctAttempts.length === allQuestionIds.length;
}

export async function recomputeGatingAfterAttempt(userId, questionId) {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { subLesson: { include: { lesson: true } } },
  });
  if (!question || !question.subLesson) return;

  const lesson = question.subLesson.lesson;
  const complete = await isLessonComplete(userId, lesson.id);
  if (!complete) return;

  await prisma.progress.upsert({
    where: { userId_lessonId: { userId: userId, lessonId: lesson.id } },
    update: { status: ProgressStatus.COMPLETED, completedAt: new Date() },
    create: { userId: userId, lessonId: lesson.id, status: ProgressStatus.COMPLETED, completedAt: new Date() },
  });

  const nextLesson = await prisma.lesson.findFirst({
    where: { unitId: lesson.unitId, order: { gt: lesson.order } },
    orderBy: { order: "asc" },
  });
  if (nextLesson) {
    await prisma.progress.upsert({
      where: { userId_lessonId: { userId: userId, lessonId: nextLesson.id } },
      update: { status: ProgressStatus.UNLOCKED },
      create: { userId: userId, lessonId: nextLesson.id, status: ProgressStatus.UNLOCKED },
    });
  }
}
