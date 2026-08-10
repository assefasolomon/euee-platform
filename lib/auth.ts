import { createServerClient } from "@supabase/ssr";
import { prisma } from "@/lib/prisma";

export async function getCurrentUserId(req) {
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
  if (!supabaseUser) return null;

  const appUser = await prisma.user.findUnique({
    where: { supabaseAuthId: supabaseUser.id },
  });

  return appUser ? appUser.id : null;
}
