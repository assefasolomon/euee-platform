import { prisma } from "@/lib/prisma";

export default async function LandingPage() {
  const subjects = await prisma.subject.findMany({
    orderBy: [{ stream: "asc" }, { order: "asc" }],
  });

  const natural = subjects.filter(function(s) { return s.stream === "NATURAL"; });
  const social = subjects.filter(function(s) { return s.stream === "SOCIAL"; });

  function SubjectRow(subject) {
    return (
      <li key={subject.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
        <span className="text-sm font-body text-ink">{subject.name}</span>
        {subject.isPublished ? (
          <span className="text-xs font-mono uppercase tracking-wide text-teal">Available</span>
        ) : (
          <span className="text-xs font-mono uppercase tracking-wide text-ink/30">Locked</span>
        )}
      </li>
    );
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-wide text-teal/70">Ethiopian University Entrance Exam Prep</p>
          <h1 className="font-display text-4xl font-semibold text-ink mt-2">Learn deeply. Progress steadily.</h1>
          <p className="text-base font-body text-ink/60 mt-3 max-w-xl mx-auto">
            Project-based, self-paced preparation built directly on the Ethiopian Grade 9-12 curriculum.
          </p>
          <a href="/login" className="inline-block mt-6 rounded bg-teal px-6 py-3 text-sm font-medium text-white hover:bg-teal-deep transition-colors">
            Get started
          </a>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="rounded-lg border border-line bg-panel p-6">
            <h2 className="font-display text-xl font-semibold text-teal-deep mb-1">Natural Science Stream</h2>
            <p className="text-xs font-body text-ink/50 mb-4">Grade 12</p>
            <ul>
              {natural.map(SubjectRow)}
            </ul>
          </section>

          <section className="rounded-lg border border-line bg-panel p-6">
            <h2 className="font-display text-xl font-semibold text-teal-deep mb-1">Social Science Stream</h2>
            <p className="text-xs font-body text-ink/50 mb-4">Grade 12</p>
            <ul>
              {social.length === 0 ? (
                <p className="text-sm font-body text-ink/50">Coming soon.</p>
              ) : (
                social.map(SubjectRow)
              )}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-gold/30 bg-gold/5 p-6">
          <h2 className="font-display text-xl font-semibold text-ink mb-1">Entrance Exams</h2>
          <p className="text-sm font-body text-ink/70">Original, exam-style practice questions organized by stream, year, and subject. Coming soon.</p>
        </section>
      </div>
    </main>
  );
}
