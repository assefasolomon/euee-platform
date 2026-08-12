import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import QuizQuestion from "@/components/QuizQuestion";

export default async function ChapterReviewPage(props) {
  const params = await props.params;
  const examId = params.examId;

  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  if (!authResult.data.user) {
    redirect("/login");
  }

  const exam = await prisma.chapterExam.findUnique({
    where: { id: examId },
    include: {
      unit: { include: { subject: true } },
      questions: {
        orderBy: { order: "asc" },
        include: { question: true },
      },
    },
  });

  if (!exam) {
    notFound();
  }

  const totalAvailable = exam.questions.length;

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-wide text-teal/70">
            {exam.unit.subject.name} - Grade {exam.unit.gradeLevel} - Unit {exam.unit.order} - {exam.unit.title}
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink mt-1">Chapter Review</h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1">
            <span className="font-mono text-xs text-gold">{totalAvailable} / {exam.targetQuestionCount} review questions available</span>
          </div>
          <p className="text-sm font-body text-ink/60 mt-3">
            These questions draw from every lesson in this unit, mixed together at varied difficulty, similar to how the actual entrance exam mixes topics. More questions are added to this bank progressively over time.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {exam.questions.map(function(eq, idx) {
            const q = eq.question;
            return (
              <div key={q.id}>
                <p className="font-mono text-[11px] text-ink/40 mb-1">Question {idx + 1} of {totalAvailable}</p>
                <QuizQuestion
                  questionId={q.id}
                  stem={q.stem}
                  options={q.options}
                  correctOptionId={q.correctOptionId}
                  explanationCorrect={q.explanationCorrect}
                  explanationsWrong={q.explanationsWrong}
                  hints={q.hints}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <a href="/" className="text-sm font-body text-teal underline underline-offset-4">&larr; Back to dashboard</a>
        </div>
      </div>
    </main>
  );
}
