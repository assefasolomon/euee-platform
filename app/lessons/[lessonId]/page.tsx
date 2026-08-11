import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import QuizQuestion from "@/components/QuizQuestion";
import SequenceGraph from "@/components/SequenceGraph";

export default async function LessonPage(props) {
  const params = await props.params;
  const lessonId = params.lessonId;

  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  const authUser = authResult.data.user;
  if (!authUser) {
    redirect("/login");
  }

  const appUser = await prisma.user.findUnique({ where: { supabaseAuthId: authUser.id } });

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      unit: { include: { subject: true } },
      subLessons: { orderBy: { order: "asc" }, include: { knowledgeCheckQuestions: true } },
      videoRecs: { where: { reviewedByAdmin: true } },
    },
  });

  if (!lesson) {
    notFound();
  }

  const allLessonsInUnit = await prisma.lesson.findMany({
    where: { unitId: lesson.unitId },
    orderBy: { order: "asc" },
    select: { id: true, order: true, title: true },
  });

  const progressRows = appUser
    ? await prisma.progress.findMany({ where: { userId: appUser.id, lessonId: { in: allLessonsInUnit.map(function(l) { return l.id; }) } } })
    : [];

  const progressByLessonId = {};
  progressRows.forEach(function(p) { progressByLessonId[p.lessonId] = p.status; });

  const thisLessonStatus = progressByLessonId[lesson.id] || (lesson.order === 1 ? "UNLOCKED" : "LOCKED");
  const statusLabel = thisLessonStatus === "COMPLETED" ? "Completed" : thisLessonStatus === "UNLOCKED" ? "In progress" : "Locked";
  const statusColor = thisLessonStatus === "COMPLETED" ? "text-teal" : thisLessonStatus === "UNLOCKED" ? "text-gold" : "text-ink/40";

  const currentIndex = allLessonsInUnit.findIndex(function(l) { return l.id === lesson.id; });
  const prevLesson = currentIndex > 0 ? allLessonsInUnit[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessonsInUnit.length - 1 ? allLessonsInUnit[currentIndex + 1] : null;
  const nextLessonStatus = nextLesson ? (progressByLessonId[nextLesson.id] || "LOCKED") : null;
  const nextIsAvailable = nextLesson && (nextLessonStatus === "UNLOCKED" || nextLessonStatus === "COMPLETED");

  const sequenceGraphPoints = [
    { n: 1, value: 200 }, { n: 2, value: 350 }, { n: 3, value: 500 }, { n: 4, value: 650 }, { n: 5, value: 800 },
  ];

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wide text-teal/70">
              {lesson.unit.subject.name} - Grade {lesson.unit.gradeLevel} - {lesson.unit.title}
            </p>
            <span className={"text-xs font-mono " + statusColor}>{statusLabel}</span>
          </div>
          <h1 className="font-display text-3xl font-semibold text-ink mt-1">{lesson.title}</h1>
          <div className="flex items-center gap-1.5 mt-4">
            {allLessonsInUnit.map(function(l) {
              return (
                <div key={l.id} className={"h-1.5 flex-1 rounded-full " + (l.order <= lesson.order ? "woven-path" : "woven-path--muted")} title={l.title} />
              );
            })}
          </div>
        </header>

        {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
          <div className="mb-8 rounded-lg border border-teal/20 bg-teal/5 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-teal mb-2">By the end of this lesson, you will be able to</p>
            <ul className="flex flex-col gap-1">
              {lesson.learningObjectives.map(function(obj, i) {
                return (
                  <li key={i} className="text-sm font-body text-ink/85 flex gap-2">
                    <span className="text-teal">-</span>
                    <span>{obj}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {lesson.subLessons.map(function(sub) {
          return (
            <section key={sub.id} className="mb-10">
              <h2 className="font-display text-xl font-semibold text-teal-deep mb-3">{sub.title}</h2>
              <div className="prose prose-slate max-w-none font-body text-[15px] leading-relaxed text-ink/90 whitespace-pre-wrap">
                {sub.contentMd}
              </div>
              {lesson.id === "math-g12-u1-l1" && sub.order === 1 && (
                <div className="mt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mb-2">Visual: the equb sequence graphed</p>
                  <SequenceGraph points={sequenceGraphPoints} />
                  <p className="text-xs text-ink/60 mt-2">Notice the points are separate dots, not connected by a line, since n only takes whole-number values like 1, 2, 3.</p>
                </div>
              )}
              {sub.commonMistakesMd && (
                <div className="mt-4 rounded border-l-4 border-gold bg-gold/5 px-4 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-gold mb-1">Common mistakes</p>
                  <p className="text-sm font-body text-ink/80">{sub.commonMistakesMd}</p>
                </div>
              )}
            </section>
          );
        })}

        {lesson.additionalExamplesMd && (
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-teal-deep mb-3">Additional Examples</h2>
            <div className="prose prose-slate max-w-none font-body text-[15px] leading-relaxed text-ink/90 whitespace-pre-wrap">
              {lesson.additionalExamplesMd}
            </div>
          </section>
        )}

        {lesson.subLessons.some(function(s) { return s.knowledgeCheckQuestions.length > 0; }) && (
          <section className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mb-4">Knowledge check - complete to unlock the next lesson</p>
            <div className="flex flex-col gap-4">
              {lesson.subLessons.map(function(sub) {
                return sub.knowledgeCheckQuestions.map(function(q) {
                  return (
                    <QuizQuestion
                      key={q.id}
                      questionId={q.id}
                      stem={q.stem}
                      options={q.options}
                      correctOptionId={q.correctOptionId}
                      explanationCorrect={q.explanationCorrect}
                      explanationsWrong={q.explanationsWrong}
                      hints={q.hints}
                    />
                  );
                });
              })}
            </div>
          </section>
        )}

        {lesson.summaryMd && (
          <section className="mb-10 rounded-lg border border-line bg-panel p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mb-2">Lesson Summary</p>
            <p className="text-sm font-body text-ink/85 leading-relaxed">{lesson.summaryMd}</p>
          </section>
        )}

        {lesson.videoRecs.length > 0 && (
          <aside className="mb-10 border-t border-line pt-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mb-3">Additional resources</p>
            <ul className="flex flex-col gap-3">
              {lesson.videoRecs.map(function(v) {
                return (
                  <li key={v.id}>
                    <a href={v.youtubeUrl} target="_blank" rel="noreferrer" className="text-sm font-body text-teal underline underline-offset-4">{v.title}</a>
                    <p className="text-xs text-ink/60 mt-0.5">{v.reasonMd}</p>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        <nav className="flex items-center justify-between border-t border-line pt-6">
          {prevLesson ? (
            <a href={"/lessons/" + prevLesson.id} className="text-sm font-body text-teal underline underline-offset-4">
              &larr; {prevLesson.title}
            </a>
          ) : (
            <a href="/" className="text-sm font-body text-teal underline underline-offset-4">&larr; Back to dashboard</a>
          )}

          {nextLesson ? (
            nextIsAvailable ? (
              <a href={"/lessons/" + nextLesson.id} className="text-sm font-body text-teal underline underline-offset-4">
                {nextLesson.title} &rarr;
              </a>
            ) : (
              <span className="text-sm font-body text-ink/30">{nextLesson.title} &rarr; (locked)</span>
            )
          ) : (
            <span className="text-sm font-body text-ink/40">End of unit</span>
          )}
        </nav>
      </div>
    </main>
  );
}
