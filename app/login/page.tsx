"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stream, setStream] = useState("NATURAL");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email: email, password: password })
      : await supabase.auth.signUp({ email: email, password: password });

    if (result.error) {
      setLoading(false);
      setError(result.error.message);
      return;
    }

    await fetch("/api/auth/complete-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stream: stream }),
    });

    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-ink mb-1">
          {mode === "login" ? "Log in" : "Create your account"}
        </h1>
        <p className="text-sm font-body text-ink/60 mb-6">EUEE Prep Platform</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" required placeholder="Email" value={email} onChange={function(e) { setEmail(e.target.value); }} className="rounded border border-line bg-white px-4 py-2.5 text-sm font-body outline-none focus:border-teal" />

          <input type="password" required placeholder="Password" value={password} onChange={function(e) { setPassword(e.target.value); }} className="rounded border border-line bg-white px-4 py-2.5 text-sm font-body outline-none focus:border-teal" />

          {mode === "signup" && (
            <div>
              <p className="text-xs font-body text-ink/60 mb-1">Which stream are you in?</p>
              <select value={stream} onChange={function(e) { setStream(e.target.value); }} className="w-full rounded border border-line bg-white px-4 py-2.5 text-sm font-body outline-none focus:border-teal">
                <option value="NATURAL">Natural Science</option>
                <option value="SOCIAL">Social Science</option>
              </select>
            </div>
          )}

          {error && <p className="text-sm text-clay">{error}</p>}

          <button type="submit" disabled={loading} className="mt-2 rounded bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-deep transition-colors disabled:opacity-60">
            {loading ? "Please wait..." : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <button onClick={function() { setMode(mode === "login" ? "signup" : "login"); }} className="mt-4 text-xs font-body text-teal underline underline-offset-4">
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </main>
  );
}
