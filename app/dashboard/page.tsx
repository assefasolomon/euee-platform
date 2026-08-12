import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const authResult = await supabase.auth.getUser();
  const user = authResult.data.user;

  if (!user) {
    redirect("/login");
  }

  const appUser = await prisma.user.findUnique({ where: { supabaseAuthId: user.id } });

  const allSubjects = await prisma.subject.findMany({
    where: appUser && appUser.stream ? { stream: appUser.stream } : {},
    orderBy: { order: "asc" },
    include: { units: { select: { id: true } } },
  });

  const streak = appUser ? await prisma.streak.findUnique({ where: { userId: appUser.id } }) : null;

  return (
    <main className="min-h-screen bg-paper">
      <div className="h-2 woven-path" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8 flex items-start justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-teal/70">EUEE Prep Platform</p>
            <h1 className="font-display text-3xl font-semibold text-ink mt-1">
              {appUser && appUser.fullName ? "Welcome back, " + appUser.fullName : "Your subjects"}
            </h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl font-semibold text-gold">
              {streak ? streak.currentStreak : 0}
              <span className="text-sm text-ink/50"> day streak</span>
            </p>
            <SignOutButton />
          </div>
        </header>

        <div className="grid gap-4">
          {allSubjects.map(function(subject) {
            if (subject.isPublished) {
              return (
                <a key={subject.id} href={"/subjects/" + subject.id} className="flex items-center justify-between rounded-lg border border-line bg-panel p-5 hover:border-teal/50 transition-colors">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-ink">{subject.name}</h2>
                    <p className="text-xs font-body text-ink/50 mt-0.5">{subject.units.length} unit{subject.units.length !== 1 ? "s" : ""}</p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wide text-teal">Available</span>
                </a>
              );
            }
            return (
              <div key={subject.id} className="flex items-center justify-between rounded-lg border border-line bg-panel/50 p-5 opacity-60">
                <h2 className="font-display text-lg font-semibold text-ink/50">{subject.name}</h2>
                <span className="text-xs font-mono uppercase tracking-wide text-ink/30">Locked</span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
