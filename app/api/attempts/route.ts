import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recomputeGatingAfterAttempt } from "@/lib/progress";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(req) {
  const userId = await getCurrentUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = await req.json();
  const questionId = body.questionId;
  const chosenOptionId = body.chosenOptionId;
  const correct = body.correct;
  const hintsUsed = body.hintsUsed;

  const priorAttempts = await prisma.quizAttempt.count({
    where: { userId: userId, questionId: questionId },
  });

  await prisma.quizAttempt.create({
    data: {
      userId: userId,
      questionId: questionId,
      chosenOptionId: chosenOptionId,
      correct: correct,
      attemptNo: priorAttempts + 1,
      hintsUsed: hintsUsed,
    },
  });

  if (correct) {
    await recomputeGatingAfterAttempt(userId, questionId);
  }

  const existingStreak = await prisma.streak.findUnique({ where: { userId: userId } });
  const today = new Date();

  if (!existingStreak) {
    await prisma.streak.create({
      data: { userId: userId, currentStreak: 1, longestStreak: 1, lastActiveDate: today },
    });
  } else {
    const last = new Date(existingStreak.lastActiveDate);
    const sameDay = last.toDateString() === today.toDateString();
    if (!sameDay) {
      const oneDayMs = 24 * 60 * 60 * 1000;
      const diffDays = Math.round((today.setHours(0,0,0,0) - last.setHours(0,0,0,0)) / oneDayMs);
      if (diffDays === 1) {
        const newCurrent = existingStreak.currentStreak + 1;
        await prisma.streak.update({
          where: { userId: userId },
          data: {
            currentStreak: newCurrent,
            longestStreak: Math.max(newCurrent, existingStreak.longestStreak),
            lastActiveDate: new Date(),
          },
        });
      } else {
        await prisma.streak.update({
          where: { userId: userId },
          data: { currentStreak: 1, lastActiveDate: new Date() },
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
