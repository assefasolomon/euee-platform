import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: function() { return req.cookies.getAll(); },
        setAll: function() {},
      },
    }
  );

  const authResult = await supabase.auth.getUser();
  const supabaseUser = authResult.data.user;
  if (!supabaseUser || !supabaseUser.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const existing = await prisma.user.findUnique({ where: { supabaseAuthId: supabaseUser.id } });
  if (existing) {
    return NextResponse.json({ ok: true, userId: existing.id });
  }

  let body = {};
  try {
    body = await req.json();
  } catch (e) {
    body = {};
  }
  const chosenStream = body.stream === "SOCIAL" ? "SOCIAL" : "NATURAL";

  const newUser = await prisma.user.create({
    data: {
      supabaseAuthId: supabaseUser.id,
      email: supabaseUser.email,
      fullName: supabaseUser.email.split("@")[0],
      role: "STUDENT",
      stream: chosenStream,
    },
  });

  return NextResponse.json({ ok: true, userId: newUser.id });
}
