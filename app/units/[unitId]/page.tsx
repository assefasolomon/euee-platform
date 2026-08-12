import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UnitPage(props) {
  const params = await props.params;
  const unitId = params.unitId;

  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  const authUser = authResult.data.user;
  if (!authUser) {
    redirect("/login");
  }

  const appUser = await prisma.user.findUnique({ where: { supabaseAuthId: authUser.id } });

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: {
      subject: true,
      lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, order: true } },
      chapterExams: { select: { id: true, targetQuestionCount: true, questions: { select: { questionId: true } } } },
    },
  });

  if (!unit) {
    notFound();
  }

  const progressRows = appUser
    ? await prisma.progress.findMany({ where: { userId: appUser.id, lessonId: { in: unit.lessons.map(function(l) { return l.id; }) } } })
    : [];
  const progressByLessonId = {};
  progressRows.forEach(function(p) { progressByLessonId[p.lessonId] = p.status; });

  function statusLabel(lessonId, isFirstLessonInUnit) {
    const status = progressByLessonId[lessonId];
    if (status === "COMPLETED") return { text: "Completed", cls: "text-teal" };
    if (status === "UNLOCKED") return { text: "In progress", cls: "text-gold" };
    if (isFirstLessonInUnit) return { text: "Start here", cls: "text-teal" };
    return { text: "Locked", cls: "text-ink/40" };
  }

  const exam = unit.chapterExams.length > 0 ? unit.chapterExams[0] : null;

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8">
          <a href={"/subjects/" + unit.subject.id} className="text-xs font-mono text-teal underline underline-offset-4">&larr; {unit.subject.name}</a>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mt-3">Grade {unit.gradeLevel}</p>
          <h1 className="font-display text-3xl font-semibold text-ink mt-1">Unit {unit.order} - {unit.title}</h1>
        </header>

        <ul className="flex flex-col gap-2 mb-6">
          {unit.lessons.map(function(lesson, idx) {
            const label = statusLabel(lesson.id, idx === 0);
            return (
              <li key={lesson.id}>
                <a href={"/lessons/" + lesson.id} className="flex items-center justify-between rounded-lg border border-line bg-panel p-4 hover:border-teal/50 transition-colors">
                  <span className="text-sm font-body text-ink">{lesson.order}. {lesson.title}</span>
                  <span className={"text-xs font-mono " + label.cls}>{label.text}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {exam && (
          <a href={"/reviews/" + exam.id} className="flex items-center justify-between rounded-lg border border-gold/30 bg-gold/5 p-4 hover:border-gold/60 transition-colors">
            <span className="text-sm font-mono uppercase tracking-wide text-gold">Chapter review practice</span>
            <span className="text-xs font-mono text-ink/40">{exam.questions.length}/{exam.targetQuestionCount}</span>
          </a>
        )}
      </div>
    </main>
  );
}
