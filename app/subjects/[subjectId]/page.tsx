import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function SubjectPage(props) {
  const params = await props.params;
  const subjectId = params.subjectId;

  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  if (!authResult.data.user) {
    redirect("/login");
  }

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    include: {
      units: {
        orderBy: [{ gradeLevel: "asc" }, { order: "asc" }],
        include: {
          lessons: { select: { id: true } },
          chapterExams: { select: { id: true } },
        },
      },
    },
  });

  if (!subject) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8">
          <a href="/dashboard" className="text-xs font-mono text-teal underline underline-offset-4">&larr; All subjects</a>
          <h1 className="font-display text-3xl font-semibold text-ink mt-3">{subject.name}</h1>
          <p className="text-sm font-body text-ink/60 mt-1">{subject.units.length} unit{subject.units.length !== 1 ? "s" : ""}</p>
        </header>

        <div className="flex flex-col gap-4">
          {subject.units.map(function(unit) {
            return (
              <a key={unit.id} href={"/units/" + unit.id} className="block rounded-lg border border-line bg-panel p-5 hover:border-teal/50 transition-colors">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50">Grade {unit.gradeLevel}</p>
                <h2 className="font-body font-semibold text-ink text-lg mt-1">Unit {unit.order} - {unit.title}</h2>
                <p className="text-xs font-body text-ink/50 mt-1">{unit.lessons.length} lesson{unit.lessons.length !== 1 ? "s" : ""}</p>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
