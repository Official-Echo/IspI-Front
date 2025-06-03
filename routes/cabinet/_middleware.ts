import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const { isAuthenticated } = ctx.state as { isAuthenticated: boolean };

  if (!isAuthenticated) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  return await ctx.next();
}
