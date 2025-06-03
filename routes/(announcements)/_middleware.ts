import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const { isAuthenticated, user } = ctx.state as {
    isAuthenticated: boolean;
    user: { role: string } | null;
  };

  if (!isAuthenticated || user?.role !== "teacher") {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  return await ctx.next();
}
