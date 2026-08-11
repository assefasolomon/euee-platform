import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  const user = authResult.data.user;

  if (!user) {
    redirect("/login");
  }

  const appUser = await prisma.user.findUnique({ where: { supabaseAuthId: user.id } });

  const subjects = await prisma.subject.findMany({
    where: appUser && appUser.stream ? { stream: appUser.stream } : {},
    orderBy: { order: "asc" },
    include: {
      units: {
        orderBy: [{ gradeLevel: "asc" }, { order: "asc" }],
        include: {
          lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, order: true } },
          chapterExams: { select: { id: true, targetQuestionCount: true, questions: { select: { id: true } } } },
        },
      },
    },
  });

  const progressRows = appUser ? await prisma.progress.findMany({ where: { userId: appUser.id } }) : [];
  const progressByLessonId = {};
  progressRows.forEach(function(p) { progressByLessonId[p.lessonId] = p.status; });

  function statusLabel(lessonId, isFirstLessonInUnit) {
    const status = progressByLessonId[lessonId];
    if (status === "COMPLETED") return { text: "Completed", cls: "text-teal" };
    if (status === "UNLOCKED") return { text: "In progress", cls: "text-gold" };
    if (isFirstLessonInUnit) return { text: "Start here", cls: "text-teal" };
    return { text: "Locked", cls: "text-ink/40" };
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-wide text-teal/70">EUEE Prep Platform</p>
          <h1 className="font-display text-3xl font-semibold text-ink mt-1">
            {appUser && appUser.fullName ? "Welcome back, " + appUser.fullName : "Your subjects"}
          </h1>
        </header>

        {subjects.length === 0 && <p className="text-sm font-body text-ink/60">No subjects available yet for your stream.</p>}

        <div className="flex flex-col gap-8">
          {subjects.map(function(subject) {
            return (
              <section key={subject.id}>
                <h2 className="font-display text-xl font-semibold text-teal-deep mb-3">{subject.name}</h2>
                {subject.units.map(function(unit) {
                  const exam = unit.chapterExams.length > 0 ? unit.chapterExams[0] : null;
                  return (
                    <div key={unit.id} className="mb-5 rounded-lg border border-line bg-panel p-4">
                      <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Grade {unit.gradeLevel}</p>
                      <h3 className="font-body font-semibold text-ink mb-2">{unit.title}</h3>
                      <ul className="flex flex-col gap-1">
                        {unit.lessons.map(function(lesson, idx) {
                          const lessonUrl = "/lessons/" + lesson.id;
                          const label = statusLabel(lesson.id, idx === 0);
                          return (
                            <li key={lesson.id} className="flex items-center justify-between">
                              <a href={lessonUrl} className="text-sm font-body text-teal underline underline-offset-4">
                                {lesson.order}. {lesson.title}
                              </a>
                              <span className={"text-xs font-mono " + label.cls}>{label.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                      {exam && (
                        <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
                          <a href={"/reviews/" + exam.id} className="text-xs font-mono uppercase tracking-wide text-gold underline underline-offset-4">
                            Chapter review practice
                          </a>
                          <span className="text-xs font-mono text-ink/40">{exam.questions.length}/{exam.targetQuestionCount}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
